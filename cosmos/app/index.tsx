// Point d'entrée racine — redirige vers l'onboarding
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/onboarding" />;
}
