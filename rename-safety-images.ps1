# PowerShell script to rename and organize safety images
$sourceDir = "public\images\safety"

# Create backup directory
$backupDir = "public\images\safety\backup"
if (-not (Test-Path $backupDir)) {
    New-Item -Path $backupDir -ItemType Directory -Force | Out-Null
    Write-Host "Created backup directory: $backupDir"
}

# First, back up existing images
Get-ChildItem -Path $sourceDir -Filter "*.jpg" -Exclude "backup" | ForEach-Object {
    # Skip if it's the backup directory itself
    if ($_.BaseName -ne "backup") {
        Copy-Item -Path $_.FullName -Destination (Join-Path $backupDir $_.Name) -Force
        Write-Host "Backed up $($_.Name) to backup folder"
    }
}

# Define the safety image names for renaming
$safetyImageNames = @(
    "safe_hug.jpg",
    "safe_doctor.jpg",
    "safe_handshake.jpg",
    "safe_highfive.jpg",
    "unsafe_stranger.jpg",
    "unsafe_secrets.jpg"
)

# Function to ask user for an image file to use for a specific name
function Select-ImageFile($targetName) {
    Write-Host ""
    Write-Host "Select an image file to use for: $targetName" -ForegroundColor Cyan
    Write-Host "Options in current directory:" -ForegroundColor Yellow
    
    # List all JPG files in the source directory
    $fileOptions = Get-ChildItem -Path $sourceDir -Filter "*.jpg" | Where-Object { $_.BaseName -ne "backup" } | ForEach-Object { $_.Name }
    
    # Display options
    for ($i = 0; $i -lt $fileOptions.Count; $i++) {
        Write-Host "[$i] $($fileOptions[$i])"
    }

    Write-Host "[S] Skip this file" -ForegroundColor Yellow
    Write-Host "[B] Browse for file..." -ForegroundColor Green
    
    $selection = Read-Host "Enter your choice"
    
    if ($selection -eq "S" -or $selection -eq "s") {
        return $null
    } elseif ($selection -eq "B" -or $selection -eq "b") {
        # Use a dialog to browse for a file
        Add-Type -AssemblyName System.Windows.Forms
        $openFileDialog = New-Object System.Windows.Forms.OpenFileDialog
        $openFileDialog.InitialDirectory = [System.IO.Path]::GetFullPath($sourceDir)
        $openFileDialog.Filter = "JPEG files (*.jpg;*.jpeg)|*.jpg;*.jpeg|All files (*.*)|*.*"
        $openFileDialog.Title = "Select an image for $targetName"
        
        if ($openFileDialog.ShowDialog() -eq "OK") {
            return $openFileDialog.FileName
        } else {
            return $null
        }
    } elseif ([int]::TryParse($selection, [ref]$null) -and [int]$selection -ge 0 -and [int]$selection -lt $fileOptions.Count) {
        # User selected a file from the list
        return Join-Path $sourceDir $fileOptions[[int]$selection]
    } else {
        Write-Host "Invalid selection. Skipping this file." -ForegroundColor Red
        return $null
    }
}

# Process each safety image name
foreach ($imageName in $safetyImageNames) {
    $targetPath = Join-Path $sourceDir $imageName
    
    # Check if the file already exists and is not empty/placeholder
    $needsReplacement = $true
    if (Test-Path $targetPath) {
        $fileSize = (Get-Item $targetPath).Length
        if ($fileSize -gt 1000) { # If file is larger than 1KB, assume it's a real image
            Write-Host "File $imageName already exists and appears to be a real image. Skip? (Y/N)" -ForegroundColor Yellow
            $skipResponse = Read-Host
            if ($skipResponse -eq "Y" -or $skipResponse -eq "y") {
                $needsReplacement = $false
            }
        }
    }
    
    if ($needsReplacement) {
        $sourcePath = Select-ImageFile $imageName
        if ($sourcePath) {
            # If the source and target are the same, create a copy first
            if ($sourcePath -eq $targetPath) {
                $tempPath = Join-Path $sourceDir "temp_$imageName"
                Copy-Item -Path $sourcePath -Destination $tempPath -Force
                $sourcePath = $tempPath
            }
            
            # Copy to the target name
            Copy-Item -Path $sourcePath -Destination $targetPath -Force
            Write-Host "Renamed/copied image to $imageName" -ForegroundColor Green
            
            # Clean up temp file if created
            if (Test-Path (Join-Path $sourceDir "temp_$imageName")) {
                Remove-Item -Path (Join-Path $sourceDir "temp_$imageName") -Force
            }
        } else {
            Write-Host "Skipped $imageName" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "Done! Safety images have been organized." -ForegroundColor Green
Write-Host "Original files are backed up in $backupDir" -ForegroundColor Cyan 