
const observer = document.querySelector("#root")
console.log(observer)

export default function smoothScroll() {
    const { height: cardHeight } = observer.lastElementChild.getBoundingClientRect();
    console.log(cardHeight)
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}