// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有代码块（支持 Rouge syntax highlighting）
  const codeBlocks = document.querySelectorAll('pre.highlight, div.highlight');

  codeBlocks.forEach(function(block) {
    // 创建复制按钮
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.textContent = '复制';

    // 添加点击事件
    button.addEventListener('click', function() {
      // 获取代码文本（支持不同 Rouge 输出格式）
      let text = '';
      const codeElement = block.querySelector('code') || block.querySelector('.rouge-code');

      if (codeElement) {
        text = codeElement.innerText || codeElement.textContent;
      } else {
        text = block.innerText || block.textContent;
      }

      // 复制到剪贴板
      navigator.clipboard.writeText(text).then(function() {
        button.textContent = '已复制!';
        button.style.background = 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)';
        setTimeout(() => {
          button.textContent = '复制';
          button.style.background = 'linear-gradient(135deg, #0078ff 0%, #00c6ff 100%)';
        }, 2000);
      }).catch(function(err) {
        button.textContent = '复制失败';
        button.style.background = 'linear-gradient(135deg, #f44336 0%, #ff5722 100%)';
        setTimeout(() => {
          button.textContent = '复制';
          button.style.background = 'linear-gradient(135deg, #0078ff 0%, #00c6ff 100%)';
        }, 2000);
      });
    });

    // 将按钮插入到代码块
    block.style.position = 'relative';
    block.appendChild(button);
  });
});