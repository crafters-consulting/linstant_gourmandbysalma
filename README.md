# L'Instant Gourmand by Salma

Site d'administration des commandes / achats pour traiteur spécialisé en petites bouchées, sandwichs et quiches pour événements professionnels et personnels.

## Stack Technique

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Routing**: React Router 7 (HashRouter)
- **État**: React Query (TanStack Query) v5
- **Formulaires**: React Hook Form
- **Backend**: Supabase (BaaS)
- **Icons**: Lucide React
- **Utils**: date-fns, use-debounce
- **Linting & Formatting**: Biome.js

## Architecture

```
src/
├── components/          # Composants réutilisables
│   ├── Auth/           # Authentification (SignIn, Authenticated)
│   ├── HeaderBar/      # Barre de navigation supérieure
│   └── NavBar/         # Menu de navigation bottom (Dock DaisyUI 5)
├── hooks/              # Custom hooks et logique business
│   ├── database.types.ts       # Types générés depuis Supabase
│   ├── useSupabaseClient.ts    # Client Supabase singleton
│   ├── useSupabaseSession.ts   # Gestion de la session
│   ├── useSale*.ts            # Hooks pour les ventes
│   ├── usePurchase*.ts        # Hooks pour les achats
│   └── useDashboard*.ts       # Hooks pour le dashboard
└── pages/              # Pages de l'application
    ├── dashboard/      # Tableau de bord avec calendrier
    │   ├── index.tsx              # Page principale Dashboard
    │   ├── CalendarView.tsx       # Vue calendrier mensuelle
    │   ├── CalendarDay.tsx        # Cellule de jour avec points
    │   └── DaySalesDetails.tsx    # Modal détails commandes
    ├── sales/          # Gestion des ventes
    ├── purchases/      # Gestion des achats
    └── taxes/          # Rapport des taxes
```

## Modèle de Données (Supabase)

### Tables

#### `sales` - Ventes
- `id`: UUID (PK)
- `clientName`: string - Nom du client
- `deliveryDateTime`: datetime - Date et heure de livraison
- `deliveryAddress`: string? - Adresse de livraison
- `description`: string? - Commentaire/détails de la commande
- `amount`: number - Montant total
- `deposit`: number - Acompte versé
- `depositPaymentMethod`: string - Mode de paiement acompte (Revolut, PayPal, Cash)
- `remaining`: number - Reste à payer (calculé)
- `remainingPaymentMethod`: string - Mode de paiement solde (Cash, Revolut, PayPal)
- `created_at`: timestamp

#### `purchases` - Achats
- `id`: UUID (PK)
- `date`: date - Date de l'achat
- `amount`: number - Montant
- `description`: string? - Description de l'achat
- `created_at`: timestamp

#### `sale_purchases` - Liaison Ventes/Achats
- `id`: number (PK)
- `sale_id`: UUID (FK → sales)
- `purchase_id`: UUID (FK → purchases)
- `created_at`: timestamp

### Relations
- Une vente peut avoir plusieurs achats associés (many-to-many via `sale_purchases`)
- Permet de tracker les coûts par vente

## Patterns de Développement

### 1. Custom Hooks avec React Query

Tous les appels API utilisent React Query pour le cache et la synchronisation:

```typescript
// Exemple: hooks/useSaleListQuery.ts
export function useSaleListQuery() {
  const client = useSupabaseClient()
  return useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const { data, error } = await client
        .from('sales')
        .select('*')
        .order('deliveryDateTime', { ascending: false })

      if (error) throw error
      return data
    }
  })
}

// Exemple: hooks/useUpcomingSalesQuery.ts (commandes à venir)
export function useUpcomingSalesQuery() {
  const client = useSupabaseClient()
  return useQuery({
    queryKey: ['sales', 'upcoming'],
    queryFn: async () => {
      const today = startOfDay(new Date()).toISOString()
      const { data, error } = await client
        .from('sales')
        .select('*')
        .gte('deliveryDateTime', today)
        .order('deliveryDateTime', { ascending: true })

      if (error) throw error
      return data
    }
  })
}
```

### 2. Mutations avec React Query

```typescript
// Exemple: hooks/useSaleUpsertMutation.ts
export function useSaleUpsertMutation(options?: { onSuccess?: () => void }) {
  const client = useSupabaseClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (sale: Sale) => {
      const { data, error } = await client
        .from('sales')
        .upsert(sale)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] })
      options?.onSuccess?.()
    }
  })
}
```

### 3. Formulaires avec React Hook Form

```typescript
// Utilisation dans un composant
const { register, watch, setValue, handleSubmit } = useForm<Sale>({
  defaultValues: data
})

// Auto-calcul avec debounce
const [amount, deposit] = watch(['amount', 'deposit'])
const [debouncedAmount] = useDebounce(amount, 500)

useEffect(() => {
  if (isValidAmount(debouncedAmount)) {
    const remaining = Math.ceil((debouncedAmount * 0.7) / 10) * 10
    setValue('deposit', debouncedAmount - remaining)
    setValue('remaining', remaining)
  }
}, [debouncedAmount, setValue])
```

### 4. Routing

L'application utilise HashRouter pour la compatibilité mobile:

```typescript
// Routes principales
/ → Dashboard
/sales → Liste des ventes
/sales/new → Créer une vente
/sales/:id → Voir une vente
/sales/:id/edit → Éditer une vente
/purchases → Liste des achats
/purchases/new → Créer un achat
/purchases/:id → Voir un achat
/report-taxes → Rapport des taxes
```

## Configuration

### Variables d'Environnement (.env)

```bash
VITE_SUPABASE_URL=https://xgifguimvmivebjpkssv.supabase.co
VITE_SUPABASE_ANON_KEY=<clé_anonyme>
```

### React Query Config (main.tsx:17-24)

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // Cache 1 minute
      retry: 1
    }
  }
})
```

## Styles Tailwind & DaisyUI

DaisyUI fournit un système de composants complet basé sur Tailwind CSS. Classes principales utilisées:

### Composants DaisyUI
- `btn` - Boutons avec variantes (`btn-primary`, `btn-error`, `btn-ghost`, `btn-circle`)
- `card` - Cartes avec `card-body`, `card-title`
- `form-control` - Conteneur de formulaire
- `input`, `textarea`, `select` - Champs de formulaire avec variantes (`input-bordered`, `textarea-bordered`, `select-bordered`)
- `navbar` - Barre de navigation avec `navbar-start`, `navbar-center`, `navbar-end`
- `dock` - Navigation bottom moderne (DaisyUI 5) avec `dock-label`, `dock-active`, tailles: `dock-sm`, `dock-md`, `dock-lg`
- `alert` - Alertes avec variantes (`alert-error`)
- `loading` - Spinners de chargement (`loading-spinner`)
- `badge` - Badges avec variantes (`badge-ghost`, `badge-outline`, `badge-primary`)
- `stats` - Affichage de statistiques

### Classes personnalisées (src/index.css)
- `.hstack` - Flex horizontal avec justify-between

### Thème
Le projet utilise le thème `light` de DaisyUI avec les couleurs par défaut.

## Scripts NPM

```bash
npm run dev       # Démarrer le serveur de dev (Vite)
npm run build     # Build de production
npm run lint      # Linter avec Biome.js
npm run lint:fix  # Auto-fix des erreurs de lint avec Biome.js
npm run format    # Formatter le code avec Biome.js
npm run gen       # Générer les types TypeScript depuis Supabase
```

### Génération des Types

```bash
npm run gen
```

Ce script génère automatiquement `src/hooks/database.types.ts` depuis le schéma Supabase.

## Fonctionnalités Principales

### Dashboard
- **Calendrier des commandes à venir** - Vue mensuelle interactive
- Navigation entre les mois (précédent/suivant)
- Visualisation des commandes par jour avec points colorés
- Code couleur selon le statut de paiement:
  - Vert: Entièrement payé
  - Orange: Partiellement payé (acompte versé)
  - Rouge: Non payé
- Détails complets en cliquant sur un jour (client, montant, heure, adresse, description)
- Calendrier headless custom avec `date-fns` pour un contrôle total du design

### Gestion des Ventes
- Liste des ventes avec tri par date de livraison
- Création/édition avec calcul automatique de l'acompte (30%)
- Arrondi intelligent du reste à payer (dizaine supérieure)
- Modes de paiement: Revolut, PayPal, Espèces
- Association des achats aux ventes

### Gestion des Achats
- Liste et création d'achats
- Liaison aux ventes pour tracking des coûts
- Vue détaillée par achat

### Rapport Taxes
- Export et visualisation des données fiscales

## Authentification

- Utilise Supabase Auth
- Session persistée automatiquement
- Component `<Authenticated>` wraps toute l'app (main.tsx:31)
- Hook `useSupabaseSession()` pour accéder à l'utilisateur

## Mobile First

- Design responsive avec Tailwind
- Support des safe areas iOS (viewport-fit=cover)
- Navigation bottom bar fixe
- HashRouter pour compatibilité PWA

## Conventions de Code

### Nommage
- Composants: PascalCase
- Hooks: camelCase avec préfixe `use`
- Types: PascalCase
- Fichiers: Correspond au nom du composant principal

### Structure des Hooks
```typescript
export function useXxxQuery() {
  const client = useSupabaseClient()
  return useQuery({ ... })
}

export function useXxxMutation(options?) {
  const client = useSupabaseClient()
  const queryClient = useQueryClient()
  return useMutation({ ... })
}
```

### Structure des Pages
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
      <HeaderBar title="..." backUrl="..." />
      <main className="grid gap-4">
        {/* contenu */}
      </main>
    </>
  )
}
```

## Guidelines pour Nouvelles Fonctionnalités

1. **Créer les types Supabase** - Modifier le schéma DB puis `npm run gen`
2. **Créer les hooks** - Un hook query et un hook mutation
3. **Créer la page** - Suivre le pattern existant (HeaderBar + main)
4. **Ajouter la route** - Dans `main.tsx`
5. **Ajouter au menu** - Dans `components/NavBar/index.tsx` si nécessaire

## Debugging

- React Query Devtools: Non installé (à ajouter si besoin)
- Supabase logs: Dashboard Supabase
- Console browser pour erreurs client

## Performance

- Images optimisées pour mobile
- Lazy loading non implémenté (petite app)
- Cache React Query: 1 minute
- Debounce sur calculs de formulaires: 500ms

## TODO / Améliorations Futures

- [ ] Tests unitaires (Vitest)
- [ ] Tests E2E (Playwright)
- [ ] PWA manifest
- [ ] Offline support
- [ ] Export Excel pour rapports
- [ ] Notifications push
- [ ] Multi-utilisateurs avec rôles
- [ ] Gestion des produits/catalogue
