# PowerShell script to rename number files
$sourceDir = "public\images\numbers"

# Create a backup directory
$backupDir = "public\images\numbers\backup"
if (-not (Test-Path $backupDir)) {
    New-Item -Path $backupDir -ItemType Directory -Force | Out-Null
}

# 1. First make copies of the existing png files to the backup directory
Get-ChildItem -Path $sourceDir -Filter "*.png" | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination (Join-Path $backupDir $_.Name) -Force
    Write-Host "Backed up $($_.Name) to backup folder"
}

# 2. Rename existing files to match the pattern (number0.png, number1.png, etc.)
Get-ChildItem -Path $sourceDir -Filter "*.png" | ForEach-Object {
    if ($_.Name -match "^(\d+)\.png$") {
        $number = $matches[1]
        $newName = "number$number.png"
        $newPath = Join-Path $sourceDir $newName
        
        # Remove any existing file with the new name (our script might have created these earlier)
        if (Test-Path $newPath) {
            Remove-Item -Path $newPath -Force
            Write-Host "Removed existing file $newName"
        }
        
        # Rename the file
        Rename-Item -Path $_.FullName -NewName $newName -Force
        Write-Host "Renamed $($_.Name) to $newName"
    }
}

# 3. Create placeholder files for any missing numbers and objects
for ($i = 0; $i -le 9; $i++) {
    $fileName = "number$i.png"
    $filePath = Join-Path $sourceDir $fileName
    
    if (-not (Test-Path $filePath)) {
        Write-Host "Creating placeholder for missing file: $fileName"
        New-Item -Path $filePath -ItemType File -Force | Out-Null
        Set-Content -Path $filePath -Value "Placeholder for number $i image. Replace with actual image."
    }
}

# Create object images if they don't exist
$objects = @("apple", "star", "car", "fish")
foreach ($obj in $objects) {
    $fileName = "$obj.png"
    $filePath = Join-Path $sourceDir $fileName
    
    if (-not (Test-Path $filePath)) {
        Write-Host "Creating placeholder for missing object: $fileName"
        New-Item -Path $filePath -ItemType File -Force | Out-Null
        Set-Content -Path $filePath -Value "Placeholder for $obj image. Replace with actual image."
    }
}

Write-Host "Done! All number files have been renamed and missing files have been created as placeholders." 