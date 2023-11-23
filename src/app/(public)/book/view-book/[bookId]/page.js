'use client';
import React, { useState, useEffect } from 'react';
import axios from '@/utils/index'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useParams, useRouter } from 'next/navigation';

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
  const [pdfContent,setPdfContent] = useState('');
  useEffect(() => {
    
    axios
      .get(`/assets/books/${params.bookId}`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }) .then((response) => {
 
        const signedUrl = response?.data?.signed_url;
     
        if(signedUrl){
          window.open(signedUrl,"_blank")
        //  router.push(signedUrl)
        }
        // router.replace(signedUrl)
     
      })

  }, [params.quizId]);

  return (
    <div className="w-screen h-screen">
      {/* <PDFViewer style={styles.pdfViewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.text}>{pdfContent}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer> */}
    </div>
  );
};

export default BookPage;
