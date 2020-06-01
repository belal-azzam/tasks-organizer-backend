import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({ name: "Unique", async: false })
export class UniqueValidation implements ValidatorConstraintInterface {


    validate(text: string, args: ValidationArguments) {
        console.log('6666666');
        console.log(text);
        console.log(args);
        return true;
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "Text ($value) is too short or too long!";
    }
}