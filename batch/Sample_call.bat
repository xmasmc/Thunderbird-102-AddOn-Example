@rem test batch for Thunderbird AddOn Sample_callCMD
@echo %DATE% %TIME% call from thunderbird extension Sample_callCMD>>d:\Sample_call.log
@echo %* >>d:\Sample_call.log

@echo Sample_call.bat
@echo E-Mail from: %1
@echo ------------------------------------------------------------------------------------
@echo %2
@echo ------------------------------------------------------------------------------------
@pause 
