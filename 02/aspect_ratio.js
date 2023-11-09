
export const aspectRatio = {
    width: window.innerWidth,
    height: window.innerHeight,
    get() { return this.width / this.height}
};

window.addEventListener("resize", () => {
    aspectRatio.width = window.innerWidth;
    aspectRatio.height = window.innerHeight;
});