export default function Mount(className, Module) {
    const targets = document.getElementsByClassName(className);

    for(let i = (targets.length - 1); i >= 0; i-= 1) {
        new Module(targets[i], className);
    }
}