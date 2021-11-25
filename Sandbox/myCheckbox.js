var attackSpeed = 1;

function buffSS() {
    if (document.getElementById("check").click) {
        attackSpeed *= 1.176;
    }
    else {
        attackSpeed /= 1.176;
    }
}

document.getElementById("atk-result").innerHTML = attackSpeed;