import {
  Blend,
  Home,
  LifeBuoy,
  List,
  PiggyBank,
  Settings,
  TrendingUp,
  Wallet,
} from 'lucide-react'

export const Options = [
  {
    title: 'Início',
    url: '/',
    icon: Home,
  },
  {
    title: 'Grupo',
    url: '/grupo',
    icon: Blend,
  },
  {
    title: 'Despesa',
    url: '/despesa',
    icon: Wallet,
  },
  {
    title: 'Receita',
    url: '/receita',
    icon: TrendingUp,
  },
  {
    title: 'Meta',
    url: '/meta',
    icon: PiggyBank,
  },
  {
    title: 'Categorias',
    url: '/categorias',
    icon: List,
  },
  {
    title: 'Configurações',
    url: '/configuracoes',
    icon: Settings,
  },
  {
    title: 'Ajuda',
    url: '/ajuda',
    icon: LifeBuoy,
  },
]
