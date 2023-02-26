


class Timeline {
    /**
     *
     * @param start start position relative to the viewport
     * @param end end position relative to the viewport
     */
    constructor(start, end) {
        this.start = start
        this.end = end
    }

    setStart() {
        const windowHeight = window.innerHeight
        return windowHeight * (this.start/100)
    }

    setEnd() {
        const windowHeight = window.innerHeight
        return windowHeight * (this.end/100)
    }

    setStartIndicator() {
        const startPoint = this.setStart()
        const divEl = document.createElement('DIV')
        divEl.style.height = '2px'
        divEl.style.width = '20px'
        divEl.style.backgroundColor = 'rgba(0,255,255,1)'
        divEl.style.position = 'fixed'
        divEl.style.top = `${startPoint}px`
        divEl.style.right = `20px`
        divEl.innerText = 'Start here'
        document.body.appendChild(divEl)
    }
    setEndIndicator() {
        const endPoint = this.setEnd()
        const divEl = document.createElement('DIV')
        divEl.style.height = '2px'
        divEl.style.width = '20px'
        divEl.style.backgroundColor = 'rgba(0,255,255,1)'
        divEl.style.position = 'fixed'
        divEl.style.top = `${endPoint}px`
        divEl.style.right = `20px`
        divEl.innerText = 'End here'
        document.body.appendChild(divEl)
    }

    getStartAnim() {
        return window.innerHeight * (this.start/100)
    }

    init() {
        const trigger1 = new Trigger('section-3')
        const triggerPosY = trigger1.getPosY()
        const startAnim = window.innerHeight * (75/100)
        const endAnim = window.innerHeight * (25/100)
        const animationDistance = startAnim - endAnim
        const animationElement = document.querySelector('.anim')

        trigger1.addIndicator()

        let reached = false
        let reachedEnd = false
        window.addEventListener("scroll", () => {
            console.log('scroll')
            const startAnimation = triggerPosY - startAnim
            const endAnimation = triggerPosY - endAnim
            const relativeScroll = window.scrollY - (triggerPosY - startAnim)

            if(window.scrollY >=  startAnimation && !reachedEnd && relativeScroll * 100/animationDistance <= 100) {
                reached = true
                animationElement.style.width = `${relativeScroll * 100/animationDistance}%`
            }



            if(window.scrollY >=  endAnimation && !reachedEnd) {
                reachedEnd = true
            }
        })
    }

}

const timeline1 = new Timeline(75, 25)
timeline1.init()
timeline1.setStartIndicator()
timeline1.setEndIndicator()

