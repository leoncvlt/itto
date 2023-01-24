var width = 1;
var height = 1;
var lineWidth = 1;
var tmpBuffer = new Float32Array(12);
var canvas = document.createElement("canvas");
var gl = canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: true });
gl.clearColor(0.0, 0.0, 0.0, 0.0);

var buffer = (function () {
  var b = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, tmpBuffer, gl.DYNAMIC_DRAW);
})();

var uInvResolution = null;
var uColour = null;

var program = (function () {
  var vs = gl.createShader(gl.VERTEX_SHADER);
  var fs = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(
    vs,
    `
      precision lowp float;
      
      attribute vec2 aPosition;
      
      uniform vec2 uInvResolution;
      
      void main() {
        vec2 vPosition = vec2(
          aPosition.x * uInvResolution.x * 2.0 - 1.0,
          -(aPosition.y * uInvResolution.y * 2.0 - 1.0)
        );
        
        gl_Position = vec4(vPosition,0.0,1.0);
      }
    `
  );

  gl.shaderSource(
    fs,
    `
      precision lowp float;
      
      uniform vec4 uColour;
      
      void main() {
        gl_FragColor = uColour;
      }
    `
  );

  gl.compileShader(vs);
  gl.compileShader(fs);

  var p = gl.createProgram();

  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  gl.useProgram(p);

  uInvResolution = gl.getUniformLocation(p, "uInvResolution");
  uColour = gl.getUniformLocation(p, "uColour");

  return p;
})();

gl.vertexAttribPointer(0, 2, gl.FLOAT, gl.FALSE, 8, 0);
gl.enableVertexAttribArray(0);

addEventListener("unload", function () {
  gl.deleteBuffer(buffer);
  gl.deleteProgram(program);
  gl = null;
});

export default {
  canvas,
  clear: function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
  },

  line: function (x1, y1, x2, y2) {
    var x = x2 - x1;
    var y = y2 - y1;
    var invL = 1.0 / Math.sqrt(x * x + y * y);

    x = x * invL;
    y = y * invL;

    var hLineWidth = lineWidth * 0.5;
    var bl_x = x1 - y * hLineWidth;
    var bl_y = y1 + x * hLineWidth;
    var br_x = x1 + y * hLineWidth;
    var br_y = y1 - x * hLineWidth;
    var tl_x = x2 - y * hLineWidth;
    var tl_y = y2 + x * hLineWidth;
    var tr_x = x2 + y * hLineWidth;
    var tr_y = y2 - x * hLineWidth;

    tmpBuffer[0] = tr_x;
    tmpBuffer[1] = tr_y;
    tmpBuffer[2] = bl_x;
    tmpBuffer[3] = bl_y;
    tmpBuffer[4] = br_x;
    tmpBuffer[5] = br_y;
    tmpBuffer[6] = tr_x;
    tmpBuffer[7] = tr_y;
    tmpBuffer[8] = tl_x;
    tmpBuffer[9] = tl_y;
    tmpBuffer[10] = bl_x;
    tmpBuffer[11] = bl_y;

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, tmpBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  },

  rect: function (x, y, w, h) {
    var vertices = new Float32Array([x, y, x + w, y, x, y + h, x, y + h, x + w, y, x + w, y + h]);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  },

  setColour: function (r, g, b, a) {
    gl.uniform4f(
      uColour,
      r * 0.00392156862745098,
      g * 0.00392156862745098,
      b * 0.00392156862745098,
      a * 0.00392156862745098
    );
  },

  setLineWidth: function (width) {
    lineWidth = width;
  },

  setSize: function (_width, _height) {
    width = _width;
    height = _height;

    canvas.width = width;
    canvas.height = height;

    gl.uniform2f(uInvResolution, 1.0 / width, 1.0 / height);
    gl.viewport(0, 0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT);
  },

  getImage: function () {
    return canvas;
  },
};
