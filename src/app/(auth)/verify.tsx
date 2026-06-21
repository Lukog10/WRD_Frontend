import React, { useState, useRef, useEffect } from 'react';
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

export default function VerifyScreen() {
  const router = useRouter();
  const { verifyOtp } = useAuth();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(59);

  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next field
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    // Auto-focus previous field on backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      setError('Please enter all 4 digits');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const success = await verifyOtp(otpCode);
      if (!success) {
        setError('Incorrect verification code');
      }
      // NavigationGuard in _layout.tsx automatically redirects to (tabs) once user is set
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(59);
      setError('');
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
            <MaterialIcons name="mark-email-read" size={40} color={Colors.primary} />
          </View>
          <Text style={[Typography.headlineLg, styles.title]}>Verify Email</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit code sent to your email address to secure your account.
          </Text>
        </View>

        <View style={styles.card}>
          {error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={16} color={Colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* OTP Code Input Boxes */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputs.current[index] = ref; }}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : null,
                ]}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0}
                accessibilityLabel={`OTP digit ${index + 1}`}
              />
            ))}
          </View>

          {/* Resend Section */}
          <View style={styles.timerRow}>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend code in 0:{timer < 10 ? `0${timer}` : timer}</Text>
            ) : (
              <Pressable onPress={handleResend} accessibilityLabel="Resend code">
                <Text style={styles.resendLink}>Resend Code</Text>
              </Pressable>
            )}
          </View>

          {/* Verify Button */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleVerify}
            disabled={loading}
            accessibilityLabel="Verify email"
          >
            {loading ? (
              <ActivityIndicator color={Colors.onPrimary} size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Verify Email</Text>
            )}
          </Pressable>
        </View>

        {/* Back to sign in */}
        <Pressable
          onPress={() => router.push('/(auth)/login' as any)}
          style={styles.backLinkContainer}
          accessibilityLabel="Back to sign in"
        >
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
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.stackSm,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 56,
    height: 56,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceContainerLowest,
    textAlign: 'center',
    fontFamily: 'BeVietnamPro-SemiBold',
    fontSize: 22,
    color: Colors.onSurface,
  },
  otpInputFilled: {
    borderColor: Colors.primary,
  },
  timerRow: {
    alignItems: 'center',
    marginVertical: Spacing.stackSm,
  },
  timerText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: Colors.outline,
  },
  resendLink: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: Colors.secondary,
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
