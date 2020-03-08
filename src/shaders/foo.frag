#ifdef GL_ES
precision mediump float;
precision mediump int;
precision mediump sampler2D;
#endif

uniform sampler2D u_bytes;
uniform float u_addToAlpha;
uniform float u_texWidth;

void main() {
    // read previous texel data
    vec4 texel = texture2D(u_bytes, vec2(gl_FragCoord.xy) / u_texWidth);

    // denormalize texel
    texel *= 255.0;

    // add value to alpha color channel
    texel.a += u_addToAlpha;

    // output normalized texel
	gl_FragColor = texel / 255.0;
}