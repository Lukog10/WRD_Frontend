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

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
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
        {/* Brand Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {/* Styled Traditional Geometric Border / Emblem */}
            <View style={styles.emblemOuter}>
              <View style={styles.emblemInner}>
                <MaterialIcons name="checkroom" size={28} color={Colors.primary} />
              </View>
            </View>
          </View>
          <Text style={[Typography.displayLg, styles.brandTitle]}>WRD</Text>
          <Text style={styles.brandSubtitle}>WARDROBE DIGITAL</Text>
          <Text style={styles.tagline}>Crafted Modernism for Your Personal Style</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={[Typography.titleMd, styles.cardTitle]}>Sign In</Text>

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
                placeholder="Enter your email"
                placeholderTextColor={Colors.outline}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.label}>Password</Text>
              <Pressable onPress={() => router.push('/(auth)/forgot-password' as any)}>
                <Text style={styles.forgotPasswordText}>Forgot?</Text>
              </Pressable>
            </View>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock-outline" size={20} color={Colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor={Colors.outline}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={20}
                  color={Colors.outline}
                />
              </Pressable>
            </View>
          </View>

          {/* Sign In Button */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.onPrimary} size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Sign In</Text>
            )}
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Go to Register */}
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/(auth)/register' as any)}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </Pressable>
        </View>

        {/* Footer info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Authentic Indian Craftsmanship meets AI Intelligence</Text>
        </View>
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
    alignItems: 'center',
    marginBottom: Spacing.stackLg,
  },
  logoContainer: {
    marginBottom: Spacing.base,
  },
  emblemOuter: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
  },
  emblemInner: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  brandTitle: {
    color: Colors.primary,
    marginTop: Spacing.base,
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontFamily: Typography.labelCaps.fontFamily,
    fontSize: 10,
    letterSpacing: 4,
    color: Colors.outline,
    marginTop: -4,
  },
  tagline: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginTop: Spacing.base,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xl,
    padding: Spacing.containerPadding,
    borderWidth: 1,
    borderColor: Colors.surfaceContainer,
    // diffused shadow colored with primary hue
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  cardTitle: {
    color: Colors.onSurface,
    marginBottom: Spacing.stackMd,
    textAlign: 'center',
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
    marginBottom: Spacing.stackSm,
  },
  label: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginBottom: 6,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  forgotPasswordText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    color: Colors.secondary,
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
  eyeIcon: {
    padding: 8,
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.stackSm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.surfaceContainer,
  },
  dividerText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    color: Colors.outline,
    paddingHorizontal: 10,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 15,
    color: Colors.primary,
  },
  footer: {
    marginTop: Spacing.stackLg,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: Colors.outline,
    textAlign: 'center',
  },
});
