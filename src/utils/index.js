// 异步挂载js文件
export function scriptLoader(url) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = url;
        script.moduleName = url;
        script.onerror = reject;
        document.body.appendChild(script);
        script.onload = script.onreadystatechange = function() {
            if(!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                resolve();
                script.onload = script.onreadystatechange = null;
            }
        };
    });
}
