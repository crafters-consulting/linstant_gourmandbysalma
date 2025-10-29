import { useForm } from "react-hook-form"
import { useSignInMutation } from "../../hooks"

export const SignIn = () => {
    const { register, handleSubmit } = useForm<{
        email: string
        password: string
    }>()
    const { mutate, isError, isPending } = useSignInMutation()

    return (
        <div className="mx-auto text-center w-full max-w-md pt-20 pb-40 px-4">
            <h1 className="mb-8">Bienvenue à nouveau</h1>
            <form
                className="card bg-base-100 shadow-xl"
                onSubmit={handleSubmit((it) => mutate(it))}
            >
                <div className="card-body gap-4">
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Adresse e-mail"
                        className="input input-bordered w-full"
                    />
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Mot de passe"
                        className="input input-bordered w-full"
                    />

                    {isError && (
                        <div className="alert alert-error">
                            <span>
                                Adresse e-mail ou mot de passe incorrect
                            </span>
                        </div>
                    )}

                    <button
                        className="btn btn-primary w-full mt-4"
                        disabled={isPending}
                    >
                        {isPending && (
                            <span className="loading loading-spinner" />
                        )}
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    )
}
