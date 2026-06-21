import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius } from '../../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendLink = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const success = await forgotPassword(email);
      if (success) {
        router.push('/(auth)/forgot-success' as any);
      } else {
        setError('Failed to request reset link. Please check your email.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="lock-reset" size={40} color={Colors.primary} />
          </View>
          <Text style={[Typography.headlineLg, styles.title]}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
        </View>

        <View style={styles.card}>
          {error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={16} color={Colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="mail-outline" size={20} color={Colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="avinash@example.com"
                placeholderTextColor={Colors.outline}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Send Link Button */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleSendLink}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.onPrimary} size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Send Reset Link</Text>
            )}
          </Pressable>
        </View>

        {/* Back to sign in */}
        <Pressable onPress={() => router.push('/(auth)/login' as any)} style={styles.backLinkContainer}>
          <MaterialIcons name="arrow-back" size={18} color={Colors.outline} />
          <Text style={styles.backLinkText}>Back to Sign In</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.containerPadding,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  header: {
    marginBottom: Spacing.stackLg,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.gutter,
  },
  title: {
    color: Colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.outline,
    marginTop: Spacing.base,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xl,
    padding: Spacing.containerPadding,
    borderWidth: 1,
    borderColor: Colors.surfaceContainer,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2F2',
    borderColor: Colors.error,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginBottom: Spacing.stackSm,
  },
  errorText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    color: Colors.error,
    marginLeft: 6,
    flex: 1,
  },
  inputGroup: {
    marginBottom: Spacing.stackMd,
  },
  label: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: Spacing.gutter,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    color: Colors.onSurface,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.base,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: Colors.outlineVariant,
  },
  primaryButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: Colors.onPrimary,
  },
  backLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.stackLg,
  },
  backLinkText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: Colors.outline,
    marginLeft: 6,
  },
});
