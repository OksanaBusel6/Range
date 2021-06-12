document.addEventListener('DOMContentLoaded', ()=> {
  rangeSlider({
    parentsSelector: '.range-slider',
    sliderSelector: '.range-slider__body'});
});

function rangeSlider({parentsSelector, sliderSelector}) {
  const range = document.querySelector(parentsSelector),
        slider = range.querySelector(sliderSelector),
        inputs = range.querySelectorAll('input'),
        inputMin = range.querySelector('#input-min'),
        inputMax = range.querySelector('#input-max'),
        buttons = slider.querySelectorAll('.range-slider__btn'),
        buttonMin = slider.querySelector('.range-slider__btn--min'),
        buttonMax = slider.querySelector('.range-slider__btn--max'),
        lineBetweenButtons = slider.querySelector('.range-slider__line'),
        min = inputMin.dataset.min,
        max = inputMax.dataset.max,
        widthRange = range.clientWidth,
        step = widthRange / (max - min);
  
  let startMin = inputMin.value,
      startMax = inputMax.value;
      
  
  changeStateButtonMin((startMin - min) * step);
  changeStateButtonMax((startMax - min) * step);
  
  buttonMin.ondragstart = function() {
    return false;
  };
  
  buttonMax.ondragstart = function() {
    return false;
  };
    
  buttons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
      const target = e.target;
     
      if(target === buttonMin) {
        document.addEventListener('mousemove', changeValueMin);
  
        range.addEventListener('mouseleave', () => {
          document.removeEventListener('mousemove', changeValueMin);
        });
        range.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', changeValueMin);
        });
      } else {
        document.addEventListener('mousemove', changeValueMax);
        range.addEventListener('mouseleave', () => {
          document.removeEventListener('mousemove', changeValueMax);
        });
        range.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', changeValueMax);
        });
      }
    });
  });
  
  inputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const value = e.currentTarget.value;
  
      if (e.currentTarget === inputMin) {
        changeStateButtonMin(value * step);
      } else {
        changeStateButtonMax(value * step);
      }
  
    });
  });
  
    
  function changeStateButtonMin(value) {
    let setLeft;
    if (value < 0) {
      setLeft = 0;
    } else {
      if (value <= buttonMax.offsetLeft) {
        setLeft = value;
      } else {
        setLeft = buttonMax.offsetLeft;
      }
    }
  
    buttonMin.style.left = setLeft + 'px';
    inputMin.value = Math.abs(Math.floor(setLeft / step));
  
    changeStateLineBetweenButtons();
  }
  
  function changeStateButtonMax(value) {
    let setLeft;
  
    if (value > max * step) {
      setLeft = max * step;
    } else {
      if (value >= buttonMin.offsetLeft) {
        setLeft = value;
      } else {
        setLeft = buttonMin.offsetLeft;
      }
    }
  
    buttonMax.style.left = setLeft + 'px';
    inputMax.value = Math.abs(Math.floor(setLeft / step));
  
    changeStateLineBetweenButtons();  
  }
  
  function changeStateLineBetweenButtons() {
    let widthLineBetweenButtons = buttonMax.offsetLeft - buttonMin.offsetLeft;
    
    lineBetweenButtons.style.left = buttonMin.offsetLeft + 'px';
    lineBetweenButtons.style.width = widthLineBetweenButtons + 'px';
  }
    
  function changeValueMin(e) {
    const pageLeft = e.clientX;
    const movies = (pageLeft - slider.offsetLeft);
  
    changeStateButtonMin(movies);
  }
  
  function changeValueMax(e) {
    const pageLeft = e.clientX;
    const movies = (pageLeft - slider.offsetLeft);
  
    changeStateButtonMax(movies);
  }

}


