// 手写jqury选择器
// 匿名自执行函数
let $ = jQuery = (function (window) {
    // 选择器
    let jQuery = function (nodeSelector) {
        // store the selected nodes
        this.nodes = document.querySelectorAll(nodeSelector)

        if (typeof nodeSelector === 'string') {
            let temp = document.querySelectorAll(nodeSelector)
            for (let i = 0; i < temp.length; i) {
                nodes[i] = temp[i]
            }
            nodes.length = temp.length

        } else {
            throw new Error("必须输入字符串")
        }

        // 添加一些方法
        nodes.addClass = function (classes) {
            let className = classes.split(" ");

            className.forEach(value => {
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].classList.add(value)
                }
            })
        }
        nodes.setText = function (text) {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].textContent = text;
            }
        }
        return nodes;
    }








})(window)

