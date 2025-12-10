'use client';
import { SummaryItemSchema, SummarySchema } from '@/interfaces/summarySchema';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontSize: 11,
		fontFamily: 'Helvetica',
	},
	title: {
		fontSize: 20,
		marginBottom: 10,
		textAlign: 'center',
	},
	sectionTitle: {
		fontSize: 14,
		marginTop: 10,
		marginBottom: 5,
		textDecoration: 'underline',
	},
	questionBlock: {
		marginBottom: 8,
	},
	bold: {
		fontWeight: 'bold',
	},
});

export const SummaryPDF = (data: SummarySchema) => (
	<Document>
		<Page style={styles.page}>
			<Text style={styles.title}>Interview Feedback Summary</Text>

			{Object.entries(data).map(([section, items]) => (
				<View key={section}>
					<Text style={styles.sectionTitle}>
						{section.charAt(0).toUpperCase() + section.slice(1)}
					</Text>

					{(items as SummaryItemSchema[]).map((item: SummaryItemSchema, i: number) => (
						<View style={styles.questionBlock} key={i}>
							<Text style={styles.bold}>{`Q${i + 1}: ${item.question}`}</Text>
							<Text>{`Your Answer: ${item.myAnswer}`}</Text>
							<Text>{`Feedback: ${item.feedback}`}</Text>
							<Text>{`Suggestion: ${item.example}`}</Text>
						</View>
					))}
				</View>
			))}
		</Page>
	</Document>
);
