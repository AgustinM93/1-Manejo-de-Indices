import { getCanvasElement, getWebGL2Context, createShader, createProgram, createVertexBuffer, bindAttributeToVertexBuffer, createIndexBuffer } from "./utils/gl-utils.js"
import { vertexShaderSourceCode, fragmentShaderSourceCode } from "./utils/shaders.js"

// #️⃣ Configuración base de WebGL

// Encontramos el canvas y obtenemos su contexto de WebGL
const canvas = getCanvasElement('canvas')
const gl = getWebGL2Context(canvas)

// Seteamos el color que vamos a usar para 'limpiar' el canvas (i.e. el color de fondo)
gl.clearColor(1, 1, 1, 1)

// #️⃣ Creamos los shaders, el programa que vamos a usar, y guardamos info de sus atributos

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSourceCode)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceCode)

const program = createProgram(gl, vertexShader, fragmentShader)

const vertexPositionLocation = gl.getAttribLocation(program, 'vertexPosition')
const vertexColorLocation = gl.getAttribLocation(program, 'vertexColor')

// #️⃣ Definimos la info de la geometría que vamos a dibujar (un cuadrado)

const vertexPositions = [
  0.0, 0.0, // 0 👈 indice de cada posición
  0.0, 0.6,  // 1
  0.2, 0.3,  // 2
  -0.2, 0.3, // 3
  0.55, 0.25, //4
  -0.55, 0.25, //5
  -0.3, -0.1, //6
  0.3, -0.1, //7
  0.33, -0.52, //8
  0.0, -0.35, //9
  -0.33, -0.52, //10
]

const vertexColors = [
  1, 0, 0,    // 0 👈 indice de cada color
  1, 0, 0,    // 1
  1, 0, 0,    // 2
  1, 0, 0,     // 3
  0, 0, 1,    // 4
  0, 0, 1,     // 5
  0, 0, 1,    // 6
  0, 0, 1,    // 7
  0, 0, 1,     //8
  0, 0, 1,    // 9
  0, 0, 1,     // 10
]

const indices = [
  // primer triangulo
  0, 1,
  1, 2,
  2, 0,
  // segundo triangulo
  0, 1,
  1, 3,
  3, 0,
  // tercer triangulo
  0, 3,
  3, 5,
  5, 0,
  // cuarto triangulo
  0, 5,
  5, 6,
  6, 0,
  // quinto triangulo
  0, 6,
  6, 10,
  10, 0,
  // sexto triangulo
  0, 10,
  10, 9,
  9, 0,
  // septimo triangulo
  0, 9,
  9, 8,
  8, 0,
  // octavo triangulo
  0, 8,
  8, 7,
  7, 0,
  // noveno triangulo
  0, 7,
  7, 4,
  4, 0,
  // decimo triangulo
  0, 4,
  4, 2,
  2, 0,
  
]

/* 📝 Describimos las tres lineas que conforman a cada triangulo */

// #️⃣ Guardamos la info del cuadrado (i.e. posiciones, colores e indices) en VBOs e IBOs

const vertexPositionsBuffer = createVertexBuffer(gl, vertexPositions)
const vertexColorsBuffer = createVertexBuffer(gl, vertexColors)
const indexBuffer = createIndexBuffer(gl, indices)

// #️⃣ Asociamos los atributos del programa a los buffers creados, y establecemos el buffer de indices a usar

// Creamos un Vertex Array Object (VAO)
const vertexArray = gl.createVertexArray()

// A partir de aca, el VAO registra cada atributo habilitado y su conexión con un buffer, junto con los indices
gl.bindVertexArray(vertexArray)

// Habilitamos cada atributo y lo conectamos a su buffer
gl.enableVertexAttribArray(vertexPositionLocation)
bindAttributeToVertexBuffer(gl, vertexPositionLocation, 2, vertexPositionsBuffer)
gl.enableVertexAttribArray(vertexColorLocation)
bindAttributeToVertexBuffer(gl, vertexColorLocation, 3, vertexColorsBuffer)

// Conectamos el buffer de indices que vamos a usar
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

// Dejamos de tomar nota en el VAO
gl.bindVertexArray(null)

// #️⃣ Establecemos el programa a usar, sus conexiónes atributo-buffer e indices a usar (guardado en el VAO)

gl.useProgram(program)
gl.bindVertexArray(vertexArray)

// #️⃣ Dibujamos la escena (nuestro majestuoso cuadrado)

// Limpiamos el canvas
gl.clear(gl.COLOR_BUFFER_BIT)

// Y dibujamos 🎨
gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0)
