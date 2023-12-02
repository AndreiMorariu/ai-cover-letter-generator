import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontSize: '12px',
    flexDirection: 'column',
    gap: '10px',
  },
  header: {
    backgroundColor: '#373D48',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '14px',
    color: '#fff',
  },
  jobTitle: {
    fontSize: '32px',
  },
  headerH1: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  section: { marginBottom: '30px' },
  content: {
    padding: '14px',
  },
});

function MyDocument({ data, phoneNumber }) {
  const { name, email, address, jobTitle } = data;

  const dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  const date = `${day}/${month}/${year}`;

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.jobTitle}>{jobTitle}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View>
            <Text>{name}</Text>
            <Text>{address}</Text>
            <Text>{phoneNumber}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.section}>Dear Hirign Manager,</Text>
          {data.coverLetter.map((p) => (
            <View style={styles.section}>
              <Text>{p.content}</Text>
            </View>
          ))}
          <View>
            <Text>Sincerly,</Text>
            <Text>{name}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default MyDocument;
