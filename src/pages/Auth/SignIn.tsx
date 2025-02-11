import {useForm} from "react-hook-form";
import {useSignInMutation} from "../../hooks";

export const SignIn = () => {
    const {register, handleSubmit} = useForm<{ email: string; password: string; }>();
    const {mutate, isError, isPending} = useSignInMutation()

    return (
        <div className="mx-auto text-center w-xs pt-20 pb-40">
            <h1 className="mb-4">Bienvenue à nouveau</h1>
            <form className="card" onSubmit={handleSubmit(it => mutate(it))}>
                <input {...register("email")} type="email" placeholder="Adresse e-mail" className="mb-2"/>
                <input  {...register("password")} type="password" placeholder="Mot de passe" className="mb-8"/>

                {isError && <p className="text-red-500 mb-8">Adresse e-mail ou mot de passe incorrect</p>}

                <button className="primary w-full" disabled={isPending}>
                    Se connecter
                </button>
            </form>
        </div>
    )
}