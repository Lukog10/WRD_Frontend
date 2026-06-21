import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '../../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function ForgotSuccessScreen() {
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <View style={styles.emblemOuter}>
            <View style={styles.emblemInner}>
              <MaterialIcons name="check-circle" size={48} color={Colors.secondary} />
            </View>
          </View>
        </View>

        <Text style={[Typography.titleMd, styles.title]}>Reset Email Sent</Text>
        <Text style={styles.description}>
          We have sent a password reset link to your email address. Please follow the instructions in the email to set a new password.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.replace('/(auth)/login' as any)}
        >
          <Text style={styles.primaryButtonText}>Return to Sign In</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.containerPadding,
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xl,
    padding: Spacing.containerPadding,
    borderWidth: 1,
    borderColor: Colors.surfaceContainer,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  iconWrapper: {
    marginVertical: Spacing.stackSm,
  },
  emblemOuter: {
    width: 96,
    height: 96,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemInner: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.primary,
    marginVertical: Spacing.gutter,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.stackMd,
    paddingHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: Spacing.base,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  primaryButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Colors.onPrimary,
  },
});
