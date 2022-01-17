
const counters = document.querySelectorAll('.count');
const speed = 2;
console.log(counters);

counters.forEach((counter) => {
    const updateCount = () => {
        const target = parseInt(counter.getAttribute('data-target'));
        console.log(target);
        const count = parseInt(counter.innerText);
        const increment = Math.trunc(target / speed);

        if (count < target) {
            counter.innerText = count + increment;
            console.log('Incremented');
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
            console.log(counter.innerText);
        }
    };
    updateCount();
});

