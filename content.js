// 使用 MutationObserver 观察 DOM 变化
const observer = new MutationObserver(() => {
    // 找到父级目标元素
    let parentTarget = document.querySelector('.bpx-player-sending-bar .bpx-player-video-info');

    if (parentTarget) {
        // 定义要注释掉的三个子元素的选择器
        const classes = [
            '.bpx-player-video-info-online',
            '.bpx-player-video-info-divide',
            '.bpx-player-video-info-dm'
        ];

        // 遍历每个选择器并注释掉相应的元素
        classes.forEach(function(className) {
            let element = parentTarget.querySelector(className);

            if (element) {
                let comment = document.createComment(element.outerHTML);
                element.replaceWith(comment);  // 用注释替换元素
            }
        });

        observer.disconnect();  // 找到后停止观察
    }
});

// 开始观察文档中的变化
observer.observe(document, { childList: true, subtree: true });


// // 输出调试信息，确认脚本是否运行
// // console.log("Content script running...");
//
// // 使用 MutationObserver 观察 DOM 变化
// const observer = new MutationObserver(() => {
//     // 定义要查找的父元素
//     const parentTarget = document.querySelector('.bpx-player-video-info');
//     // console.log("Parent Target:", parentTarget); // 调试：输出父元素
//
//     // 如果父元素存在
//     if (parentTarget) {
//         // 定义要注释掉的三个子元素的选择器
//         const classes = [
//             '.bpx-player-video-info-online',
//             '.bpx-player-video-info-divide',
//             '.bpx-player-video-info-dm'
//         ];
//
//         // 遍历每个选择器并注释掉相应的元素
//         classes.forEach(function(className) {
//             const element = parentTarget.querySelector(className);
//             // console.log(`Checking class: ${className}`, element); // 调试：输出当前检查的元素
//
//             if (element) {
//                 const comment = document.createComment(element.outerHTML);
//                 // console.log("Commenting out:", element.outerHTML); // 调试：输出将要注释的元素内容
//                 element.replaceWith(comment);  // 用注释替换元素
//                 // console.log("Element replaced with comment."); // 调试：确认替换操作
//             } else {
//                 // console.log(`Element not found for class: ${className}`); // 调试：未找到元素
//             }
//         });
//         observer.disconnect();  // 找到后停止观察
//     } else {
//         // console.log("Parent target not found."); // 调试：未找到父元素
//     }
// });
//
// // 开始观察文档中的变化
// observer.observe(document, { childList: true, subtree: true });
