export type ExportReportLinksOutput = {
  reportUrl: string
}

export type ReportLinkRow = {
  id: string
  created_at: Date | string
  original_url: string
  shortened_url: string
  access_count: number
}
