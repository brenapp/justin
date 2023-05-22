function setupMouseTracking() {

    const leftEye = document.getElementById("justin-eye1")!;
    const rightEye = document.getElementById("justin-eye2")!;
    const header = document.querySelector("header")!;
    const canvas = document.getElementById("laser-canvas")! as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;

    canvas.height = header.clientHeight;
    canvas.width = header.clientWidth;

    const leftPosition = leftEye.getBoundingClientRect();
    const rightPosition = rightEye.getBoundingClientRect();

    const center = {
        x: (leftPosition.left + rightPosition.right) / 2,
        y: (leftPosition.top + rightPosition.bottom) / 2
    };

    function handlePointerMove(event: PointerEvent) {
        const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
        const pointer = event;

        let angle = 0;
        if (!isReduced) {
            angle = Math.atan2(pointer.clientY - center.y, pointer.clientX - center.x) + Math.PI;
        }

        leftEye.style.transform = `rotate(${angle}rad)`;
        rightEye.style.transform = `rotate(${angle}rad)`;

        // If pointer is inside header
        const headerPosition = header.getBoundingClientRect();
        const pointerInside = pointer.clientX > headerPosition.left && pointer.clientX < headerPosition.right &&
            pointer.clientY > headerPosition.top && pointer.clientY < headerPosition.bottom;

        const pressing = event.buttons > 0;
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (pressing && !isReduced && pointerInside) {


            context.strokeStyle = "#E797EC";
            context.fillStyle = "rgba(231, 151, 236, 0.75)";
            context.lineWidth = 7;

            // Draw circle around the eyes
            const leftX = leftPosition.left + leftPosition.width / 2;
            const leftY = leftPosition.top + leftPosition.height / 2;
            context.beginPath();
            context.arc(leftX, leftY, leftPosition.width / 2 * 1.2, 0, 2 * Math.PI);
            context.fill();

            const rightX = rightPosition.left + rightPosition.width / 2;
            const rightY = rightPosition.top + rightPosition.height / 2;
            context.beginPath();
            context.arc(rightX, rightY, leftPosition.width / 2 * 1.2, 0, 2 * Math.PI);
            context.fill();

            context.beginPath();
            context.moveTo(leftX, leftY);
            context.lineTo(pointer.clientX, pointer.clientY);
            context.stroke();


            context.beginPath();
            context.moveTo(rightX, rightY);
            context.lineTo(pointer.clientX, pointer.clientY);
            context.stroke();

        };
    };

    header.addEventListener("pointermove", handlePointerMove);
    header.addEventListener("pointerleave", () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });
};

document.addEventListener("DOMContentLoaded", setupMouseTracking);