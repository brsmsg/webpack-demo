import './index.less'
import friday from '../public/Week_fri.png'

class Test {
  constructor() {
    this.renderDiv();
  }

  renderDiv() {
    const div = document.createElement('div');
    div.className = 'test';
    div.innerHTML = 'hello world';
    document.body.appendChild(div);

    const img = document.createElement('img');
    img.src = friday;
    document.body.appendChild(img);

  }
}

new Test();