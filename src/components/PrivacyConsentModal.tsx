import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';

export const PRIVACY_URL = 'https://sitehakim1992.github.io/privacy-site/swiftlearn-privacy/';
const APP_NAME = 'SwiftLearn';
const DEVELOPER = 'Abdelhakim MAHFOUD (newHMapps)';

type Lang = 'en' | 'zh';

// Chinese by default if the device language is Chinese, otherwise English
const detectLang = (): Lang => {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale || '';
    return locale.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  } catch (e) {
    return 'en';
  }
};

const content = {
  en: {
    title: 'Privacy Policy',
    body:
      `Welcome to ${APP_NAME}!\n` +
      `Developer: ${DEVELOPER}\n\n` +
      `${APP_NAME} is free, supported by ads from our partners, which may use your device ID and IP address.\n\n` +
      'Your lessons and progress stay on your device only, and we never ask for your name, email or phone number.\n\n' +
      'Please read our Privacy Policy and tap "Agree" to continue. If you tap "Disagree", the app will close.',
    link: 'Read the full Privacy Policy',
    agree: 'Agree',
    disagree: 'Disagree',
  },
  zh: {
    title: '隐私政策',
    body:
      `欢迎使用 ${APP_NAME}！\n` +
      `开发者：${DEVELOPER}\n\n` +
      `${APP_NAME} 完全免费，由合作伙伴提供的广告支持运营，这些广告可能会使用您的设备标识符和 IP 地址。\n\n` +
      '您的课程和学习进度仅保存在您的设备上，我们不会索取您的姓名、邮箱或手机号码。\n\n' +
      '请阅读《隐私政策》并点击“同意”继续。如果您点击“不同意”，应用将退出。',
    link: '阅读完整隐私政策',
    agree: '同意',
    disagree: '不同意',
  },
};

type Props = {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
};

const PrivacyConsentModal = ({visible, onAccept, onDecline}: Props) => {
  const [lang, setLang] = useState<Lang>(detectLang);
  const t = content[lang];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.langRow}>
            {(['en', 'zh'] as Lang[]).map(l => (
              <TouchableOpacity
                key={l}
                onPress={() => setLang(l)}
                style={[styles.langBtn, lang === l && styles.langBtnActive]}>
                <Text
                  style={[styles.langText, lang === l && styles.langTextActive]}>
                  {l === 'en' ? 'English' : '中文'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.title}>{t.title}</Text>

          <ScrollView style={styles.scroll}>
            <Text style={styles.body}>{t.body}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`${PRIVACY_URL}?lang=${lang}`)}>
              <Text style={styles.link}>{t.link}</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.btn, styles.declineBtn]}
              onPress={onDecline}>
              <Text style={styles.declineText}>{t.disagree}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.acceptBtn]}
              onPress={onAccept}>
              <Text style={styles.acceptText}>{t.agree}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  langBtn: {
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginLeft: 8,
  },
  langBtnActive: {backgroundColor: '#FF6B35'},
  langText: {color: '#FF6B35', fontSize: 14},
  langTextActive: {color: '#FFF'},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 12,
  },
  scroll: {marginBottom: 16},
  body: {fontSize: 15, lineHeight: 23, color: '#444444'},
  link: {
    marginTop: 12,
    fontSize: 15,
    color: '#FF6B35',
    textDecorationLine: 'underline',
  },
  buttons: {flexDirection: 'row', gap: 12},
  btn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  declineBtn: {borderWidth: 1, borderColor: '#BBBBBB', backgroundColor: 'transparent'},
  acceptBtn: {backgroundColor: '#FF6B35'},
  declineText: {fontSize: 16, color: '#444444'},
  acceptText: {fontSize: 16, color: '#FFF', fontWeight: 'bold'},
});

export default PrivacyConsentModal;