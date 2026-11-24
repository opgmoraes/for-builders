const width = 1774;
const height = 407;
const stripWidth = 7;
const bandHeight = 16;

type MotionTrack = {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  poses: readonly number[];
};

// Keep the stronger motion on broad surfaces. Narrow finger tracks can
// otherwise compress the nail and knuckle when their influences overlap.
function poseAmplitude(side: "human" | "robot", index: number) {
  return index < (side === "human" ? 2 : 1) ? 0.8 : 0.38;
}

// Equal-time poses encode the trailing fabric and the staggered settling of each finger.
const humanTracks: readonly MotionTrack[] = [
  { x: 28, y: 234, radiusX: 228, radiusY: 210, poses: [-18, -22, -13, 3, 11, 5, -3, 0] },
  { x: 196, y: 360, radiusX: 175, radiusY: 116, poses: [-5, -14, -21, -12, 7, 11, 3, 0] },
  { x: 878, y: 129, radiusX: 92, radiusY: 34, poses: [19, 21, 18, 15, 17, 10, 2, 0] },
  { x: 785, y: 256, radiusX: 37, radiusY: 86, poses: [-22, -22, -15, 5, 11, 4, -2, 0] },
  { x: 685, y: 282, radiusX: 33, radiusY: 80, poses: [-19, -16, -24, -10, 7, 4, 0, 0] },
  { x: 630, y: 266, radiusX: 31, radiusY: 66, poses: [9, -4, -19, -22, -6, 6, 2, 0] },
  { x: 710, y: 218, radiusX: 37, radiusY: 59, poses: [10, 12, 8, -3, -9, -4, 2, 0] },
];

const robotTracks: readonly MotionTrack[] = [
  { x: 1250, y: 156, radiusX: 292, radiusY: 180, poses: [13, 17, 14, 6, -5, -3, 0, 0] },
  { x: 912, y: 134, radiusX: 88, radiusY: 32, poses: [15, 18, 20, 17, 22, 15, 4, 0] },
  { x: 1010, y: 268, radiusX: 38, radiusY: 72, poses: [-15, -19, -16, -3, 7, 6, 0, 0] },
  { x: 1109, y: 293, radiusX: 26, radiusY: 57, poses: [-5, -11, -22, -18, 1, 5, 1, 0] },
  { x: 1150, y: 278, radiusX: 31, radiusY: 54, poses: [7, 4, -9, -17, -8, 4, 3, 0] },
  { x: 1112, y: 228, radiusX: 37, radiusY: 43, poses: [3, 11, 7, 0, -6, -4, 0, 0] },
];

function interpolatePose(poses: readonly number[], progress: number) {
  const time = progress * (poses.length - 1);
  const index = Math.min(poses.length - 2, Math.floor(time));
  const t = time - index;
  const a = poses[Math.max(0, index - 1)];
  const b = poses[index];
  const c = poses[index + 1];
  const d = poses[Math.min(poses.length - 1, index + 2)];
  return b + 0.5 * t * (c - a + t * (2 * a - 5 * b + 4 * c - d + t * (3 * b - a - 3 * c + d)));
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

export function prepareArmArtwork(selector: string, side: "human" | "robot") {
  const canvas = document.querySelector<HTMLCanvasElement>(selector);
  const gl = canvas?.getContext("webgl", { alpha: true, premultipliedAlpha: true });
  if (!canvas || !gl) return;

  const tracks = side === "human" ? humanTracks : robotTracks;
  const vertex = compileShader(gl, gl.VERTEX_SHADER, `
    attribute vec2 point;
    void main() { gl_Position = vec4(point, 0.0, 1.0); }
  `);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision highp float;
    uniform sampler2D artwork;
    uniform vec4 regions[${tracks.length}];
    uniform float offsets[${tracks.length}];
    float projectY(float x, float y) {
      float displacement = 0.0;
      for (int i = 0; i < ${tracks.length}; ++i) {
        vec2 relative = (vec2(x, y) - regions[i].xy) / regions[i].zw;
        float weight = max(0.0, 1.0 - dot(relative, relative));
        displacement += offsets[i] * weight * weight;
      }
      return y + displacement;
    }
    void main() {
      float x = gl_FragCoord.x;
      float y = ${height}.0 - gl_FragCoord.y;
      float low = y - 64.0;
      float high = y + 64.0;
      for (int i = 0; i < 11; ++i) {
        float mid = 0.5 * (low + high);
        if (projectY(x, mid) < y) low = mid;
        else high = mid;
      }
      float sampleY = 0.5 * (low + high);
      if (sampleY < 0.0 || sampleY >= ${height}.0) {
        gl_FragColor = vec4(0.0);
      } else {
        gl_FragColor = texture2D(artwork, vec2(x / ${width}.0, sampleY / ${height}.0));
      }
    }
  `);
  const program = gl.createProgram();
  const geometry = gl.createBuffer();
  const texture = gl.createTexture();
  if (!vertex || !fragment || !program || !geometry || !texture) return;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    gl.deleteBuffer(geometry);
    gl.deleteTexture(texture);
    return;
  }

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, geometry);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const point = gl.getAttribLocation(program, "point");
  gl.enableVertexAttribArray(point);
  gl.vertexAttribPointer(point, 2, gl.FLOAT, false, 0, 0);
  gl.uniform4fv(gl.getUniformLocation(program, "regions[0]"), tracks.flatMap(track => [
    track.x, track.y, track.radiusX, track.radiusY,
  ]));
  const offsets = gl.getUniformLocation(program, "offsets[0]");

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  const image = new Image();
  const motion = { progress: 0 };
  let uploaded = false;
  let renderedProgress = -1;

  function draw() {
    if (!uploaded || renderedProgress === motion.progress) return;
    renderedProgress = motion.progress;
    gl!.uniform1fv(offsets, tracks.map((track, index) =>
      poseAmplitude(side, index) * interpolatePose(track.poses, motion.progress),
    ));
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    canvas!.dataset.ready = "true";
  }

  image.onload = () => {
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      uploaded = gl.getError() === gl.NO_ERROR;
    } catch {
      return;
    }
    draw();
  };
  image.src = canvas.dataset.source!;
  return {
    motion,
    draw,
    dispose() {
      image.onload = null;
      delete canvas.dataset.ready;
      gl.deleteProgram(program);
      gl.deleteBuffer(geometry);
      gl.deleteTexture(texture);
    },
  };
}
