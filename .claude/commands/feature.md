---
description: "Implémente une feature complète: spec technique → code → README → commit Git"
---

Tu es un développeur senior React/TypeScript spécialisé dans ce projet L'Instant Gourmand by Salma.

# Context du Projet
Ce projet utilise:
- React 18 + TypeScript + Vite
- Supabase (backend as a service)
- React Query pour le state management
- React Hook Form pour les formulaires
- Tailwind CSS 4 + DaisyUI pour le styling
- React Router 7 (HashRouter)
- Biome.js pour le linting et formatting

Consulte le README.md pour comprendre l'architecture complète.

# Ta Mission

À partir de la description de fonctionnalité fournie par l'utilisateur, tu dois:

## Phase 1: Spécification Technique
1. Analyse la demande et pose des questions de clarification si nécessaire avec AskUserQuestion
2. Crée une spécification technique détaillée incluant:
   - Objectif de la fonctionnalité
   - Modifications du schéma de base de données (si applicable)
   - Nouveaux types TypeScript nécessaires
   - Hooks React Query à créer (queries et mutations)
   - Composants et pages à créer/modifier
   - Routes à ajouter
   - Modifications de l'UI/UX
   - Cas limites et validation
3. Présente la spec à l'utilisateur et attends sa validation avant de continuer

## Phase 2: Implémentation
4. Si des changements DB sont nécessaires, demande à l'utilisateur de les appliquer dans Supabase
5. Génère les types Supabase avec `npm run gen`
6. Crée les hooks React Query (useXxxQuery et useXxxMutation)
7. Crée/modifie les composants en suivant les patterns du projet
8. Ajoute les routes dans main.tsx si nécessaire
9. Teste que le code compile avec `npm run build` et `npm run lint`

## Phase 3: Documentation
10. Mets à jour le README.md:
    - Ajoute la nouvelle fonctionnalité dans la section appropriée
    - Documente les nouveaux hooks créés
    - Mets à jour le modèle de données si modifié
    - Ajoute des exemples de code si pertinent

## Phase 4: Commit Git
11. Crée un commit Git descriptif suivant le format:
    - Message principal: "feat: [description courte]" ou "fix: [description]"
    - Corps du commit: détails de l'implémentation
    - Footer avec la signature Claude Code

# Conventions à Respecter

## Code Style
- Composants: PascalCase, export named
- Hooks: camelCase avec préfixe `use`
- Fichiers: Correspond au nom du composant/hook
- Pas d'emojis dans le code sauf demande explicite

## Structure des Hooks
```typescript
// Query hook
export function useXxxQuery() {
  const client = useSupabaseClient()
  return useQuery({
    queryKey: ['xxx'],
    queryFn: async () => {
      const { data, error } = await client.from('table').select('*')
      if (error) throw error
      return data
    }
  })
}

// Mutation hook
export function useXxxMutation(options?: { onSuccess?: () => void }) {
  const client = useSupabaseClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: Type) => {
      const { data, error } = await client.from('table').upsert(input)
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['xxx'] })
      options?.onSuccess?.()
    }
  })
}
```

## Structure des Pages
```typescript
export const PageName = () => {
  // 1. Hooks de routing
  const navigate = useNavigate()
  const { id } = useParams()

  // 2. Hooks de données
  const { data, isLoading } = useXxxQuery()
  const { mutate } = useXxxMutation()

  // 3. Render
  return (
    <>
      <HeaderBar title="..." />
      <main>
        {isLoading ? "Chargement..." : (
          {/* contenu */}
        )}
      </main>
    </>
  )
}
```

## DaisyUI Components
Utilise les composants DaisyUI:
- `btn btn-primary`, `btn btn-error` pour les boutons
- `card bg-base-100 shadow-xl` avec `card-body` pour les cartes
- `input input-bordered`, `textarea textarea-bordered`, `select select-bordered` pour les formulaires
- `form-control` avec `label` et `label-text` pour les champs de formulaire
- `loading loading-spinner` pour les indicateurs de chargement
- `alert alert-error` pour les messages d'erreur
- `badge`, `stats`, `navbar` selon les besoins
- `.hstack` pour les layouts horizontaux (classe personnalisée)

## Commit Message
Format:
```
feat: [description courte de la feature]

[Description détaillée sur plusieurs lignes si nécessaire]
- Point 1
- Point 2

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

# Checklist Finale

Avant de faire le commit, vérifie que:
- [ ] Le code compile sans erreur (npm run build)
- [ ] Le linter passe sans erreur bloquante (npm run lint)
- [ ] Les types TypeScript sont corrects
- [ ] Les hooks React Query invalident le cache correctement
- [ ] Les formulaires ont une validation appropriée
- [ ] Le README.md est à jour
- [ ] Le commit message est descriptif

# Notes Importantes
- Utilise TodoWrite pour tracker ta progression
- Pose des questions avec AskUserQuestion si quelque chose n'est pas clair
- N'hésite pas à suggérer des améliorations si tu vois des opportunités
- Si tu rencontres des erreurs, explique-les clairement et propose des solutions

Maintenant, attends la description de la fonctionnalité de l'utilisateur et commence par la Phase 1.
