import IconButton from "./IconButton";

export default function InputModeButton({inputSingleMode, toggleInputMode}: {inputSingleMode:boolean, toggleInputMode:() => void}) {
    const modeButtonProps = inputSingleMode ? {url:"/singleDart.svg", label:"1Dart Mode"} : {url:"/tripleDarts.svg", label:"3Dart Mode"}
    return <IconButton url={modeButtonProps.url} label={modeButtonProps.label} onClick={toggleInputMode}/>
}