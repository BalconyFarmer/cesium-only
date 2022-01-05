import * as Cesium from 'cesium/Cesium'
import * as widget from 'cesium/Widgets/widgets.css'

/**
 * https://blog.csdn.net/weixin_36617251/article/details/118366285
 */
export default class Environment {
    constructor (app) {
        this.app = app
        this.TooltipCesium = null
    }

    /**
     * 黑夜特效
     */
    addDarckNessEff () {
        let fs =
            'uniform sampler2D colorTexture;\n' +
            'varying vec2 v_textureCoordinates;\n' +
            'uniform float scale;\n' +
            'uniform vec3 offset;\n' +
            'void main() {\n' +
            ' // vec4 color = texture2D(colorTexture, v_textureCoordinates);\n' +
            ' vec4 color = texture2D(colorTexture, v_textureCoordinates);\n' +
            ' // float gray = 0.2989*color.r+0.5870*color.g+0.1140*color.b;\n' +
            ' // gl_FragColor = vec4(gray,gray,2.0*(gray+1.0), 1.0);\n' +
            ' gl_FragColor = vec4(color.r*0.2,color.g * 0.4,color.b*0.6, 1.0);\n' +
            '}\n'

        this.app.viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
            name: 'darkEffect',
            fragmentShader: fs,
            uniforms: {
                scale: 1.0,
                offset: function () {
                    return new Cesium.Cartesian3(0.1, 0.2, 0.3)
                }
            }
        }))
    }

    /**
     * 下雨特效
     */
    addRain () {
        var fs = 'uniform sampler2D colorTexture;\n\
                varying vec2 v_textureCoordinates;\n\
                \n\
                float hash(float x){\n\
                return fract(sin(x*23.3)*13.13);\n\
                }\n\
                \n\
                void main(){\n\
                    float time = czm_frameNumber / 60.0;\n\
                    vec2 resolution = czm_viewport.zw;\n\
                    vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
                    vec3 c=vec3(.6,.7,.8);\n\
                    float a=-.4;\n\
                    float si=sin(a),co=cos(a);\n\
                    uv*=mat2(co,-si,si,co);\n\
                    uv*=length(uv+vec2(0,4.9))*.3+1.;\n\
                    float v=1.-sin(hash(floor(uv.x*100.))*2.);\n\
                    float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n\
                    c*=v*b;\n\
                    gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c, 1), 0.2);\n\
                }\n\
                '
        this.app.viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
            name: 'rainEffect',
            fragmentShader: fs
        }))
    }

    /**
     * 下雪特效
     */
    addSnow () {
        var fs = 'uniform sampler2D colorTexture;\n\
                    varying vec2 v_textureCoordinates;\n\
                    \n\
                    float snow(vec2 uv,float scale){\n\
                        float time = czm_frameNumber / 60.0;\n\
                        float w=smoothstep(1.,0.,-uv.y*(scale/10.));\n\
                        if(w<.1)return 0.;\n\
                        uv+=time/scale;\n\
                        uv.y+=time*2./scale;\n\
                        uv.x+=sin(uv.y+time*.5)/scale;\n\
                        uv*=scale;\n\
                        vec2 s=floor(uv),f=fract(uv),p;\n\
                        float k=3.,d;\n\
                        p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;\n\
                        d=length(p);\n\
                        k=min(d,k);\n\
                        k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n\
                        return k*w;\n\
                    }\n\
                    \n\
                    void main(){\n\
                        vec2 resolution = czm_viewport.zw;\n\
                        vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
                        vec3 finalColor=vec3(0);\n\
                        float c = 0.0;\n\
                        c+=snow(uv,30.)*.0;\n\
                        c+=snow(uv,20.)*.0;\n\
                        c+=snow(uv,15.)*.0;\n\
                        c+=snow(uv,10.);\n\
                        c+=snow(uv,8.);\n\
                        c+=snow(uv,6.);\n\
                        c+=snow(uv,5.);\n\
                        finalColor=(vec3(c));\n\
                        gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.3);\n\
                        \n\
                    }\n\
                    '
        this.app.viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
            name: 'snowEffect',
            fragmentShader: fs
        }))
    }

    /**
     * 大雾
     */
    addFrog() {
        var fs =
            "float getDistance(sampler2D depthTexture, vec2 texCoords) \n" +
            "{ \n" +
            "    float depth = czm_unpackDepth(texture2D(depthTexture, texCoords)); \n" +
            "    if (depth == 0.0) { \n" +
            "        return czm_infinity; \n" +
            "    } \n" +
            "    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth); \n" +
            "    return -eyeCoordinate.z / eyeCoordinate.w; \n" +
            "} \n" +
            "float interpolateByDistance(vec4 nearFarScalar, float distance) \n" +
            "{ \n" +
            "    float startDistance = nearFarScalar.x; \n" +
            "    float startValue = nearFarScalar.y; \n" +
            "    float endDistance = nearFarScalar.z; \n" +
            "    float endValue = nearFarScalar.w; \n" +
            "    float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0); \n" +
            "    return mix(startValue, endValue, t); \n" +
            "} \n" +
            "vec4 alphaBlend(vec4 sourceColor, vec4 destinationColor) \n" +
            "{ \n" +
            "    return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a); \n" +
            "} \n" +
            "uniform sampler2D colorTexture; \n" +
            "uniform sampler2D depthTexture; \n" +
            "uniform vec4 fogByDistance; \n" +
            "uniform vec4 fogColor; \n" +
            "varying vec2 v_textureCoordinates; \n" +
            "void main(void) \n" +
            "{ \n" +
            "    float distance = getDistance(depthTexture, v_textureCoordinates); \n" +
            "    vec4 sceneColor = texture2D(colorTexture, v_textureCoordinates); \n" +
            "    float blendAmount = interpolateByDistance(fogByDistance, distance); \n" +
            "    vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount); \n" +
            "    gl_FragColor = alphaBlend(finalFogColor, sceneColor); \n" +
            "} \n";

        this.app.viewer.scene.postProcessStages.add(
            new Cesium.PostProcessStage({
                fragmentShader: fs,
                uniforms: {
                    fogByDistance: new Cesium.Cartesian4(10, 0.0, 200, 1.0),
                    fogColor: Cesium.Color.GRAY,
                },
            })
        );
    }

}
