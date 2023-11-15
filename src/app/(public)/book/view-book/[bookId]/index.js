'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/utils/index'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'next/navigation';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
  },
  pdfViewer: {
    width: '100vw',
    height: '100vh',
  },
});

const BookPage = ({ session }) => {
  const params = useParams();
  const [quizContent, setQuizContent] = useState('');

  useEffect(() => {
    axios
      .get(`/assets/book/${params.bookId}/read`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      })
      .then((response) => {
        setQuizContent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quiz content:', error);
      });
  }, [params.quizId]);

  return (
    <div className="w-screen h-screen">
      <PDFViewer style={styles.pdfViewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.text}>{quizContent}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default BookPage;
