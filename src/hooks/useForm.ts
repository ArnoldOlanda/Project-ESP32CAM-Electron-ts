import { useState } from "react"

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm)

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target
    
        setFormState({
            ...formState,
            [ name ]:value
        })
    }

    const onSetNewState = ( key: string , value: string ) => {
        setFormState({
            ...formState,
            [key]:value
        })
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onSetNewState,
        onResetForm
    }

}
