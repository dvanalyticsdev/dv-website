$docxPath = 'C:\Users\pushk\Downloads\FDE_Workshop_Series_12_Weeks.docx'
$zipTmp = 'scratch\fde_temp.zip'
$extractPath = 'scratch\docx_tmp'
if (Test-Path $extractPath) { Remove-Item $extractPath -Recurse -Force }
if (Test-Path $zipTmp) { Remove-Item $zipTmp -Force }
Copy-Item $docxPath $zipTmp
Expand-Archive -Path $zipTmp -DestinationPath $extractPath -Force
[xml]$docXml = Get-Content (Join-Path $extractPath 'word\document.xml')
$out = @()
$docXml.SelectNodes("//*[local-name()='p']") | ForEach-Object {
    $t = $_.InnerText
    if ($t -and $t.Trim()) {
        $out += $t.Trim()
    }
}
$out | Set-Content 'scratch\full_docx_text.txt' -Encoding UTF8
Write-Output "Extracted $($out.Count) paragraphs to scratch\full_docx_text.txt"
