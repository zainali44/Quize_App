var countDownDate = new Date("July 9, 2023 2:10:00").getTime();
var x = setInterval(function() {
var now = new Date().getTime();
var distance = countDownDate - now;
var days = Math.floor(distance / (1000 * 60 * 60 * 24));
document.getElementById("countdown").innerHTML = days + "d ";
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
document.getElementById("countdown").innerHTML += hours + "h ";
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
document.getElementById("countdown").innerHTML += minutes + "m ";
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
document.getElementById("countdown").innerHTML += seconds + "s ";
if (distance < 0) {
    clearInterval(x);
    //not visible
    document.getElementById("countdown").style.display = "none";
    document.getElementById("quiz-closed").style.display = "none";
    document.getElementById("footer").style.display = "none";
    
}
}, 1000);
