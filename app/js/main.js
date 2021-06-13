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
        line = slider.querySelector('.range-slider__line'),
        minValue = inputMin.dataset.min,
        maxValue = inputMax.dataset.max,
        widthRange = range.clientWidth,
        step = widthRange / (maxValue - minValue);
  
  let startMin = inputMin.value,
      startMax = inputMax.value;

  const btnMinHandler = changeValue();
  const btnMaxHandler = changeValue(false);
      
  
  changeStateButtonMax(startMax * step);
  changeStateButtonMin(startMin * step);
  
  buttonMin.ondragstart = function() {
    return false;
  };
  
  buttonMax.ondragstart = function() {
    return false;
  };

  buttons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
      const target = e.target;
      target.classList.add('active');

      if(target === buttonMin) {
        document.addEventListener('mousemove', btnMinHandler);
  
        range.addEventListener('mouseleave', () => {
          document.removeEventListener('mousemove', btnMinHandler);
          buttonMin.classList.remove('active');
        });
        range.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', btnMinHandler);
          buttonMin.classList.remove('active');
        });

      } else {

        document.addEventListener('mousemove', btnMaxHandler);

        range.addEventListener('mouseleave', () => {
          document.removeEventListener('mousemove', btnMaxHandler);
          buttonMax.classList.remove('active');
        });
        range.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', btnMaxHandler);
          buttonMax.classList.remove('active');
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
    
    if (value < minValue * step) {
      setLeft = minValue * step;
    } else {
      setLeft = Math.min(value, buttonMax.offsetLeft);
    }
    
    buttonMin.style.left = setLeft + 'px';
    inputMin.value = Math.round(setLeft / step);
  
    changeStateLine();
  }
  
  function changeStateButtonMax(value) {
    let setLeft;
  
    if (value > maxValue * step) {
      setLeft = maxValue * step;
    } else {
      setLeft = Math.max(value, buttonMin.offsetLeft);
    }
  
    buttonMax.style.left = setLeft + 'px';
    inputMax.value = Math.round(setLeft / step);
  
    changeStateLine();  
  }
  
  function changeStateLine() {
    let widthLine = buttonMax.offsetLeft - buttonMin.offsetLeft;
    
    line.style.left = buttonMin.offsetLeft + 'px';
    line.style.width = widthLine + 'px';
  }
    
  function changeValue(min = true) {
    return (e) => {
      const pageLeft = e.clientX;
      const movies = (pageLeft - slider.offsetLeft);

      min ? changeStateButtonMin(movies) : changeStateButtonMax(movies);
    };
  }

}



