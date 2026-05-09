$desktopPath = "C:\Users\talal\OneDrive\Desktop\Tarkeeb_App_Description.docx"

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Add()
    $selection = $word.Selection

    # Title
    $selection.Font.Size = 24
    $selection.Font.Bold = $true
    $selection.TypeText("Tarkeeb: Food Intelligence Prototype")
    $selection.TypeParagraph()

    # Subtitle
    $selection.Font.Size = 14
    $selection.Font.Bold = $false
    $selection.Font.Italic = $true
    $selection.TypeText("Solving 'Save Fatigue' one dish at a time.")
    $selection.TypeParagraph()
    $selection.TypeParagraph()

    # Introduction
    $selection.Font.Size = 12
    $selection.Font.Italic = $false
    $selection.Font.Bold = $true
    $selection.TypeText("What is Tarkeeb?")
    $selection.TypeParagraph()
    $selection.Font.Bold = $false
    $selection.TypeText("'Tarkeeb' means 'method' or 'composition'. This app is like 'Shazam for food'. Have you ever seen a delicious meal on social media and saved it, only to never look at it again? Tarkeeb fixes that. Simply upload a picture, and the app tells you what it is and exactly how to cook it.")
    $selection.TypeParagraph()
    $selection.TypeParagraph()

    # How it works
    $selection.Font.Bold = $true
    $selection.TypeText("What does it do?")
    $selection.TypeParagraph()
    $selection.Font.Bold = $false
    $selection.TypeText("- Scans images of Pakistani and Fast Food.")
    $selection.TypeParagraph()
    $selection.TypeText("- Identifies dishes instantly (like Biryani, Nihari, or Zinger Burgers).")
    $selection.TypeParagraph()
    $selection.TypeText("- Provides a full breakdown of ingredients and step-by-step instructions.")
    $selection.TypeParagraph()
    $selection.TypeText("- Shows nutritional information like calories and protein.")
    $selection.TypeParagraph()
    $selection.TypeText("- Lets you download the recipe as a professional PDF or shop for ingredients online.")
    $selection.TypeParagraph()
    $selection.TypeParagraph()

    # Tools
    $selection.Font.Bold = $true
    $selection.TypeText("The Tools Under the Hood (Layman Terms)")
    $selection.TypeParagraph()
    $selection.Font.Bold = $false
    $selection.TypeText("1. Node.js and Express: The Engine that runs the entire website.")
    $selection.TypeParagraph()
    $selection.TypeText("2. Multer: The Hands of the app that catch the photos you upload.")
    $selection.TypeParagraph()
    $selection.TypeText("3. Passport.js: The Security Guard that lets you sign in safely using your Google or Facebook account.")
    $selection.TypeParagraph()
    $selection.TypeText("4. HTML, CSS, and JavaScript: The Paint and Controls - what makes the app look beautiful and respond to your clicks.")
    $selection.TypeParagraph()
    $selection.TypeText("5. PDF Generator: A specialized tool that creates high-quality recipe documents on the fly.")
    $selection.TypeParagraph()
    $selection.TypeParagraph()

    # Demo Specs
    $selection.Font.Bold = $true
    $selection.TypeText("Demo Specifications")
    $selection.TypeParagraph()
    $selection.Font.Bold = $false
    $selection.TypeText("- Version: 1.0 (Prototype)")
    $selection.TypeParagraph()
    $selection.TypeText("- Dataset: Curated library of 20+ popular Pakistani and Fast Food dishes.")
    $selection.TypeParagraph()
    $selection.TypeText("- Tech Stack: Full-stack Node.js environment.")
    $selection.TypeParagraph()
    $selection.TypeText("- Key Feature: Simulated AI recognition that maps visual patterns to structured data.")
    $selection.TypeParagraph()

    $doc.SaveAs([ref]$desktopPath)
    $doc.Close()
    $word.Quit()
    
    Write-Host "Word document created successfully at $desktopPath"
} catch {
    Write-Host "Failed to create Word document: $($_.Exception.Message)"
}
