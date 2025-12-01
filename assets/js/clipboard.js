// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有代码块
  const codeBlocks = document.querySelectorAll('pre.highlight');
  
  codeBlocks.forEach(function(block) {
    // 创建复制按钮
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.textContent = '复制';
    
    // 添加点击事件
    button.addEventListener('click', function() {
      // 获取代码文本（排除行号）
      const code = block.querySelector('code') || block;
      const text = code.innerText || code.textContent;
      
      // 复制到剪贴板
      navigator.clipboard.writeText(text).then(function() {
        button.textContent = '已复制!';
        setTimeout(() => { button.textContent = '复制'; }, 2000);
      }).catch(function(err) {
        button.textContent = '复制失败';
        setTimeout(() => { button.textContent = '复制'; }, 2000);
      });
    });
    
    // 将按钮插入到代码块
    block.style.position = 'relative';
    block.appendChild(button);
  });
});