// Code Block Component with Syntax Highlighting
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { codeSyntaxTheme } from '../utils/theme';

interface CodeBlockProps {
  code: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, showLineNumbers = true }) => {
  const { theme } = useTheme();

  const syntaxTheme = theme.dark ? codeSyntaxTheme.dark : codeSyntaxTheme.light;

  const highlightCode = (codeText: string): React.ReactNode[] => {
    const lines = codeText.split('\n');
    return lines.map((line, index) => {
      const tokens = tokenizeLine(line, syntaxTheme);
      return (
        <View key={index} style={styles.lineContainer}>
          {showLineNumbers && (
            <Text style={[styles.lineNumber, { color: theme.colors.textSecondary }]}>
              {index + 1}
            </Text>
          )}
          <Text style={[styles.lineText, { color: theme.colors.text }]}>
            {tokens}
          </Text>
        </View>
      );
    });
  };

  const tokenizeLine = (line: string, syntax: typeof codeSyntaxTheme.dark): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let remaining = line;
    let lastIndex = 0;

    // Check for comments first
    if (remaining.trim().startsWith('//')) {
      return [<Text key={0} style={{ color: syntax.comments[0] === '//' ? theme.colors.codeComment : theme.colors.codeComment }}>{line}</Text>];
    }

    // Process tokens
    const tokenRegex = /\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b\w+\b/g;
    let match;
    const tokens: { text: string; start: number; end: number; type: string }[] = [];

    const localRegex = /\/\/.*$|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(\b\w+\b)/g;
    while ((match = localRegex.exec(line)) !== null) {
      if (match[1]) {
        tokens.push({ text: match[1], start: match.index, end: match.index + match[1].length, type: 'string' });
      } else if (match[2]) {
        tokens.push({ text: match[2], start: match.index, end: match.index + match[2].length, type: 'string' });
      } else if (match[3]) {
        const word = match[3];
        if (syntax.keywords.includes(word)) {
          tokens.push({ text: word, start: match.index, end: match.index + word.length, type: 'keyword' });
        } else if (syntax.functions.includes(word)) {
          tokens.push({ text: word, start: match.index, end: match.index + word.length, type: 'function' });
        } else if (/^\d+$/.test(word)) {
          tokens.push({ text: word, start: match.index, end: match.index + word.length, type: 'number' });
        }
      }
      if (match[0].startsWith('//')) {
        break;
      }
    }

    if (tokens.length === 0) {
      return [<Text key={0}>{line}</Text>];
    }

    // Sort tokens by start position
    tokens.sort((a, b) => a.start - b.start);

    let currentIndex = 0;
    for (const token of tokens) {
      if (token.start > currentIndex) {
        elements.push(
          <Text key={`plain-${currentIndex}`}>
            {line.substring(currentIndex, token.start)}
          </Text>
        );
      }

      let tokenStyle = {};
      switch (token.type) {
        case 'keyword':
          tokenStyle = { color: theme.colors.codeKeyword };
          break;
        case 'string':
          tokenStyle = { color: theme.colors.codeString };
          break;
        case 'function':
          tokenStyle = { color: theme.colors.codeFunction };
          break;
        case 'number':
          tokenStyle = { color: theme.colors.codeNumber };
          break;
        default:
          tokenStyle = {};
      }

      elements.push(
        <Text key={`token-${token.start}`} style={tokenStyle}>
          {token.text}
        </Text>
      );

      currentIndex = token.end;
    }

    if (currentIndex < line.length) {
      elements.push(
        <Text key={`tail-${currentIndex}`}>
          {line.substring(currentIndex)}
        </Text>
      );
    }

    return elements.length > 0 ? elements : [<Text key={0}>{line}</Text>];
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      style={[styles.container, { backgroundColor: theme.colors.codeBackground }]}
    >
      <View style={styles.codeContainer}>
        {highlightCode(code)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  codeContainer: {
    flexDirection: 'column',
  },
  lineContainer: {
    flexDirection: 'row',
    minHeight: 22,
  },
  lineNumber: {
    width: 30,
    textAlign: 'right',
    marginRight: 12,
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
  },
  lineText: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
    flex: 1,
  },
});

export default CodeBlock;
