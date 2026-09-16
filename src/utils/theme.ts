// Theme configuration for SwiftLearn App
import { Theme, ThemeColors } from '../types';

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#FF6B35',      // برتقالي مشرق (للحفاظ على الهوية)
    secondary: '#FF8C42',   
    background: '#121212',   // رمادي داكن جداً (أريح من الأسود المطلق)
    surface: '#1E1E1E',      // لون شريط التنقل (Navbar) والشريط العلوي
    cardBackground: '#252525', // الكروت أفتح قليلاً لتعطي عمقاً
    text: '#FFFFFF',         // أبيض صافي للنصوص
    textSecondary: '#B0B0B0', // رمادي ناعم
    accent: '#FF6B35',      
    success: '#27AE60',
    warning: '#F1C40F',
    error: '#E74C3C',
    border: '#333333',      // حدود واضحة لكنها خفيفة
    codeBackground: '#1A1A1A',
    codeKeyword: '#FF79C6',
    codeString: '#F1FA8C',
    codeComment: '#6272A4',
    codeFunction: '#50FA7B',
    codeNumber: '#BD93F9',
  },
};


export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#E65100',
    secondary: '#EF6C00',
    background2: '#4F46E5', 
    background: '#F5F5F5',  // رمادي فاتح جداً (أريح من الأبيض الصريح)
    surface: '#FFFFFF',
    cardBackground: '#FFFFFF',
    text: '#1A1A1A',        // أسود ناعم للقراءة
    textSecondary: '#757575',
    accent: '#E65100',
    success: '#2E7D32',
    warning: '#F9A825',
    error: '#C62828',
    border: '#E0E0E0',
    codeBackground: '#F0F0F0',
    codeKeyword: '#0000FF',
    codeString: '#A31515',
    codeComment: '#008000',
    codeFunction: '#795E26',
    codeNumber: '#098658',
  },
};
export const codeSyntaxTheme = {
  dark: {
    keywords: ['func', 'var', 'let', 'class', 'struct', 'enum', 'if', 'else', 'for', 'while', 'return', 'import', 'guard', 'switch', 'case', 'default', 'break', 'continue', 'throw', 'try', 'catch', 'throws', 'async', 'await', 'self', 'Self', 'init', 'deinit', 'extension', 'protocol', 'private', 'public', 'internal', 'fileprivate', 'open', 'static', 'override', 'final', 'lazy', 'weak', 'unowned', 'inout', 'mutating', 'nonmutating', 'typealias', 'associatedtype', 'where', 'is', 'as', 'nil', 'true', 'false'],
    strings: ['"', "'"],
    comments: ['//', '/*', '*/'],
    functions: ['print', 'String', 'Int', 'Double', 'Bool', 'Array', 'Dictionary', 'Set'],
  },
  light: {
    keywords: ['func', 'var', 'let', 'class', 'struct', 'enum', 'if', 'else', 'for', 'while', 'return', 'import', 'guard', 'switch', 'case', 'default', 'break', 'continue', 'throw', 'try', 'catch', 'throws', 'async', 'await', 'self', 'Self', 'init', 'deinit', 'extension', 'protocol', 'private', 'public', 'internal', 'fileprivate', 'open', 'static', 'override', 'final', 'lazy', 'weak', 'unowned', 'inout', 'mutating', 'nonmutating', 'typealias', 'associatedtype', 'where', 'is', 'as', 'nil', 'true', 'false'],
    strings: ['"', "'"],
    comments: ['//', '/*', '*/'],
    functions: ['print', 'String', 'Int', 'Double', 'Bool', 'Array', 'Dictionary', 'Set'],
  },
};
