import AppButton from '@/components/primitives/AppButton';

/** @deprecated Prefer `AppButton` from `@/components/primitives` in new code. */
export default function PrimaryButton({ label, onPress }) {
  return (
    <AppButton variant="primary" fullWidth size="lg" onPress={onPress}>
      {label}
    </AppButton>
  );
}
