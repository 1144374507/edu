import TWEEN from 'tween.js';

//数值动画效果
TWEEN.numberAnimate = function(newValue, oldValue, callback) {
    function animate () {
        if (TWEEN.update()) {
            requestAnimationFrame(animate)
        }
    }
    new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
            callback(this.tweeningNumber);
        })
        .start()
    animate()
};

export default TWEEN;