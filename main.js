function main(){
    //Untuk mengenalkan mycanvas di index.html (diambil dari ID di html)
var CANVAS = document.getElementById("mycanvas")

//Untuk samain besar displaynya dengan window
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

var GL;
//Di tes dulu menggunakan try
try {
    GL = CANVAS.getContext("webgl", 
    {antialias: false})
    //untuk mengecek apakah error atau tidak
}catch (error) {
    alert("WebGL contect cannot be initialized");
    return false
}
//SHADERS (Ada 2 yaitu Shader Vertex Source dan Fragment)
var shader_vertex_source=`
attribute vec3 position;
attribute vec3 color;

uniform mat4 Pmatrix;
uniform mat4 Vmatrix;
uniform mat4 Mmatrix;

varying vec3 vColor;
void main(void){
    gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position,1.0);
    vColor = color;
}
`;
//varying buat ngirim data ke
//z nya jadi 0.0 karena web_gl bersifat 3d

var shader_fragment_source=`
precision mediump float;

varying vec3 vColor;

void main(void){
    gl_FragColor = vec4(vColor,1.0);

}
`;
//vColor mewakili titik, 1.0 mewakili alpha

var compile_shader = function(source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
        alert("ERROR IN" + typeString + " SHADER: " 
        + GL.getShaderInfolog(shader));
        return false;
    }
    return shader;
}; 

var shader_vertex = compile_shader(shader_vertex_source, 
    GL.VERTEX_SHADER, "VERTEX");
var shader_fragment = compile_shader(shader_fragment_source, 
    GL.FRAGMENT_SHADER, "FRAGMENT");

//buat nyimpen fungsi openGl
var SHADER_PROGRAM = GL.createProgram();
GL.attachShader(SHADER_PROGRAM,shader_vertex);
GL.attachShader(SHADER_PROGRAM,shader_fragment);

GL.linkProgram(SHADER_PROGRAM);


var _color = GL.getAttribLocation(SHADER_PROGRAM, 
    "color");
var _position = GL.getAttribLocation(SHADER_PROGRAM, 
    "position");

    //variabel yang berhubungan dengan shader
var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM,"Pmatrix"); 
var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM,"Vmatrix"); 
var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM,"Mmatrix"); 

GL.enableVertexAttribArray (_color);
GL.enableVertexAttribArray (_position);

GL.useProgram(SHADER_PROGRAM);
//SEGITIGA
//POINTS (titik koordinat 0.0 ada ditengah karena WebGL, ke bawah y-1, atas) 
/*var triangle_vertex = [-1,-1, //index ke 0
                        0,0,1, //Warna dibagi 255
                        1,-1, //index ke 1
                        0,1,0,
                        1,1, //index ke 2
                        1,0,0
                    ];*/
                    // var triangle_vertex = [
                    //     -1,-1,-1,   0,0,0, //position color
                    //     1,-1,-1,    1,0,0,
                    //     1,1,-1,     1,1,0,
                    //     -1,1,-1,     0,1,0,


                    //     -1,-1,1,    0,0,1,
                    //     1,-1,1,     1,0,1,
                    //     1,1,1,      1,1,1,
                    //     -1,1,1,     0,1,1
                       
                    // ]; 
                    var triangle_vertex = [
                        -1, -1, -1,     1, 1, 0,
                        1, -1, -1,     1, 1, 0,
                        1,  1, -1,     1, 1, 0,
                        -1,  1, -1,     1, 1, 0,
                     
                        -1, -1, 1,     0, 0, 1,
                        1, -1, 1,     0, 0, 1,
                        1,  1, 1,     0, 0, 1,
                        -1,  1, 1,     0, 0, 1,
                     
                        -1, -1, -1,     0, 1, 1,
                        -1,  1, -1,     0, 1, 1,
                        -1,  1,  1,     0, 1, 1,
                        -1, -1,  1,     0, 1, 1,
                     
                        1, -1, -1,     1, 0, 0,
                        1,  1, -1,     1, 0, 0,
                        1,  1,  1,     1, 0, 0,
                        1, -1,  1,     1, 0, 0,
                     
                        -1, -1, -1,     1, 0, 1,
                        -1, -1,  1,     1, 0, 1,
                        1, -1,  1,     1, 0, 1,
                        1, -1, -1,     1, 0, 1,
                     
                        -1, 1, -1,     0, 1, 0,
                        -1, 1,  1,     0, 1, 0,
                        1, 1,  1,     0, 1, 0,
                        1, 1, -1,     0, 1, 0
                      ];
                    var TRIANGLE_VERTEX = GL.createBuffer()
                    GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
                    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(triangle_vertex)
                    ,GL.STATIC_DRAW); //Float32 buat menghindari bilangan 0., biar ga merubah angka didalam variabel

                    //FACES (untuk memberi tahu urutan gambar harus berlawanan arah jarum jam)
                    /*var triangle_faces = [0,1,2];*/
                    /*var triangle_faces = [
                        0,1,2,
                        0,2,3, //2 segitiga mewakilkan 1 sisi
                        
                        4,5,6,
                        4,6,7,
                    
                        0,3,7,
                        0,4,7,
                    
                        1,2,6,
                        1,5,6,
                    
                        2,3,6,
                        3,7,6,
                    
                        0,1,5,
                        0,4,5];*/


                         
                         var triangle_faces = [     0, 1, 2,
                              0, 2, 3,
                         
                              4, 5, 6,
                              4, 6, 7,
                         
                              8, 9, 10,
                              8, 10, 11,
                         
                              12, 13, 14,
                              12, 14, 15,
                         
                              16, 17, 18,
                              16, 18, 19,
                         
                              20, 21, 22,
                              20, 22, 23];
                    var TRIANGLE_FACES = GL.createBuffer();
                    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
                    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, 
                        new Uint16Array(triangle_faces), GL.STATIC_DRAW); //Uint biar hasil bilangannya bulat

                    //Matrix
                    var PROJMATRIX = LIBS.get_projection(40,CANVAS.width/CANVAS.height,1,100); //diambil dari libs.js
                        //40 itu FOV(kamera di game apapun)
                    var MOVEMATRIX = LIBS.get_I4();
                    var VIEWMATRIX = LIBS.get_I4(); //Viewmatrix sebagai kamera

                    LIBS.translateZ(VIEWMATRIX,-5);
    //Drawing
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
    //clear color, background awal dari canvas
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
    
    GL.clearDepth(1.0);

    //for (let i = 0; i < 359; i++){}
        
    //
    var time_prev = 0;
    var animate = function(time){
        if(time>0){
        var dt = (time - time_prev);
        LIBS.rotateZ(MOVEMATRIX, dt * 0.001);
        LIBS.rotateY(MOVEMATRIX, dt * 0.003);
        LIBS.rotateX(MOVEMATRIX, dt * 0.004); //Kalo mau lambatin bisa dikalikan seperti video, dibawah 0
        time_prev = time
        console.log(time); //cek di console html
        console.log(dt)}
        GL.viewport(0,0, CANVAS.width,CANVAS.height)
        GL.clear(GL.COLOR_BUFFET_BIT | GL.D_BUFFER_BIT);

        //DRAW

        GL.uniformMatrix4fv(_Pmatrix,false,PROJMATRIX);
        GL.uniformMatrix4fv(_Vmatrix,false,VIEWMATRIX);
        GL.uniformMatrix4fv(_Mmatrix,false,MOVEMATRIX);
        GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX); //minta komputer untuk menghandle Triangle_Vertex

        GL.vertexAttribPointer(_position,3,GL.FLOAT,false, //jumlah data position ada 3 soalnya kubus
            (3+3)*4,0); //3 posisi, 3 warna
            GL.vertexAttribPointer(_color,3,GL.FLOAT,false,
                (3+3)*4,3*4); //4 itu bite jadi wajib kali 4

                GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
                GL.drawElements(GL.TRIANGLES, triangle_faces.length, GL.UNSIGNED_SHORT, 0);
    GL.flush();
    window.requestAnimationFrame(animate); //berfungsi 
    };
    animate();
//Urutannya Index ke Vertex terus ke Fragment
}
window.addEventListener('load',main)
