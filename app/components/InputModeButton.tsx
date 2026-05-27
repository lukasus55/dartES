import IconButton from "./IconButton";

interface InputModeButtonProp {
    inputSingleMode: boolean;
    toggleInputMode: () => void;
    disabled: boolean;
}

export default function InputModeButton({inputSingleMode, toggleInputMode, disabled}: InputModeButtonProp) {

    const modeButtonProps = inputSingleMode ? {url:"/singleDart.svg", label:"1Dart Mode"} : {url:"/tripleDarts.svg", label:"3Dart Mode"}
    
    return <IconButton url={modeButtonProps.url} label={modeButtonProps.label} labelDisabled="Blocked by settings" onClick={toggleInputMode} disabled={disabled}/>

}