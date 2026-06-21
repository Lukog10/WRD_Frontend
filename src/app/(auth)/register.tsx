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

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreed) {
      setError('You must agree to the Terms & Conditions');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const success = await register(name, email, password);
      if (success) {
        // Registration success redirects to verification step
        router.push('/(auth)/verify' as any);
      } else {
        setError('Registration failed. Please try a different email.');
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={[Typography.headlineLg, styles.title]}>Create Account</Text>
          <Text style={styles.subtitle}>Begin your heritage style journey</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={16} color={Colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person-outline" size={20} color={Colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Avinash Kumar"
                placeholderTextColor={Colors.outline}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

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

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock-outline" size={20} color={Colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Choose a password"
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

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock-outline" size={20} color={Colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Re-enter password"
                placeholderTextColor={Colors.outline}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Terms Agreement Checkbox */}
          <Pressable style={styles.checkboxRow} onPress={() => setAgreed(!agreed)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <MaterialIcons name="check" size={16} color={Colors.onPrimary} />}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to the <Text style={styles.highlightText}>Terms of Service</Text> and{' '}
              <Text style={styles.highlightText}>Privacy Policy</Text>.
            </Text>
          </Pressable>

          {/* Register Button */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.onPrimary} size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Create Account</Text>
            )}
          </Pressable>
        </View>

        {/* Existing account redirect */}
        <View style={styles.signinRow}>
          <Text style={styles.signinText}>Already have an account? </Text>
          <Pressable onPress={() => router.push('/(auth)/login' as any)}>
            <Text style={styles.signinLink}>Sign In</Text>
          </Pressable>
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
    marginBottom: Spacing.stackLg,
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    color: Colors.outline,
    marginTop: 4,
    textAlign: 'center',
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
    marginBottom: Spacing.stackSm,
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
  eyeIcon: {
    padding: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: Spacing.stackSm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
  highlightText: {
    fontFamily: 'Manrope-Bold',
    color: Colors.primary,
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
  signinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.stackMd,
  },
  signinText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
  },
  signinLink: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: Colors.secondary,
  },
});
