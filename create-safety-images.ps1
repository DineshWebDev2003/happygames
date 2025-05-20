# PowerShell script to create safety image directory and placeholder files
$outputDir = "public\images\safety"

# Create the safety images directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    Write-Host "Creating directory: $outputDir"
    New-Item -Path $outputDir -ItemType Directory -Force | Out-Null
}

# Define safety scenarios and their image files
$safetyImages = @(
    @{Name = "safe_hug.jpg"; Description = "A warm hug between parent and child"},
    @{Name = "unsafe_stranger.jpg"; Description = "Stranger offering candy to a child at a park"},
    @{Name = "safe_doctor.jpg"; Description = "Doctor examining a child with parent present"},
    @{Name = "safe_handshake.jpg"; Description = "Child shaking hands with a teacher"},
    @{Name = "unsafe_secrets.jpg"; Description = "Someone telling a child to keep a secret"},
    @{Name = "safe_highfive.jpg"; Description = "Child giving high five to friend"}
)

# Create placeholder files for safety images
foreach ($img in $safetyImages) {
    $outputFile = Join-Path $outputDir $img.Name
    Write-Host "Creating placeholder for $($img.Name)"
    
    # Check if file already exists and has content (might be a real image)
    if (Test-Path $outputFile) {
        $fileSize = (Get-Item $outputFile).Length
        if ($fileSize -gt 1000) { # If file is larger than 1KB, assume it's a real image
            Write-Host "File $($img.Name) already exists and appears to be a real image. Skipping." -ForegroundColor Yellow
            continue
        }
    }
    
    # Using New-Item to create an empty file
    New-Item -Path $outputFile -ItemType File -Force | Out-Null
    
    # Adding a simple text notice to the file
    Set-Content -Path $outputFile -Value "Placeholder for safety image: $($img.Description). Replace with actual image."
}

Write-Host "Done! Created safety image placeholders in $outputDir"
Write-Host "Please replace these placeholder files with actual safety images. Use child-friendly images appropriate for teaching safety concepts." 